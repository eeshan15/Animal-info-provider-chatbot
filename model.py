from ultralytics import YOLO
import os
import yaml
from pathlib import Path

# Predefined class list
CLASS_NAMES = [
    "Bengal Tiger", "Asian Elephant", "Indian Leopard", "Snow Leopard",
    "Red Panda", "Indian Rhinoceros", "Sloth Bear", "Wild Yak",
    "Golden Langur", "Malayan Tapir", "Pygmy Hog", "Asiatic Black Bear",
    "Siberian Musk Deer", "Saiga Antelope", "Pallas's Cat", "Chinese Pangolin",
    "Indian Wolf", "Golden Jackal", "Bactrian Camel", "Indian Star Tortoise",
    "King Cobra", "Reticulated Python", "Gharial", "Monitor Lizard",
    "Indian Bullfrog", "Malabar Gliding Frog", "Chinese Giant Salamander",
    "Himalayan Newt", "Bornean Flat-Headed Frog", "Bombay Night Frog",
    "Anderson's Salamander", "Indian Tree Frog", "Asian Common Toad",
    "Green Pond Frog", "Indian Peacock", "Indian Cobra", "Indian Python",
    "Indian Porcupine", "Rhesus Macaque", "Hanuman Langur", "Asian Water Monitor",
    "Hog Deer", "Barking Deer", "Clouded Leopard", "Gaur (Indian Bison)",
    "Takin", "Wild Boar", "Asian Giant Tortoise", "Slow Loris"
]

def create_yaml_config(base_path: Path):
    """Create YOLO dataset configuration file only if it does not exist."""
    yaml_path = base_path / 'dataset.yaml'

    if yaml_path.exists():
        print(f"⚠️ dataset.yaml already exists. Skipping creation.")
        return yaml_path  # Return existing path

    dataset_config = {
        'path': str(base_path),  # Dataset root dir
        'train': 'Terrestrial Asiatic Animals/*/train',  # Train images pattern
        'val': 'Terrestrial Asiatic Animals/*/valid',    # Val images pattern
        'test': 'Terrestrial Asiatic Animals/*/test',    # Test images pattern
        'names': {i: name for i, name in enumerate(CLASS_NAMES)},
        'nc': len(CLASS_NAMES),
        'species': 'Terrestrial Asiatic Animals'
    }

    with yaml_path.open('w') as f:
        yaml.dump(dataset_config, f, sort_keys=False)

    print(f"✅ Created dataset.yaml with {len(CLASS_NAMES)} classes.")
    return yaml_path

def verify_and_fix_dataset_structure(base_path: Path):
    """Verify dataset structure and create missing directories."""
    terrestrial_path = base_path / "Terrestrial Asiatic Animals"
    missing_dirs = []

    for class_name in CLASS_NAMES:
        for split in ["train", "valid", "test"]:
            dir_path = terrestrial_path / class_name / split
            if not dir_path.exists():
                missing_dirs.append(dir_path)

    if missing_dirs:
        print(f"⚠️ Missing {len(missing_dirs)} directories. Creating them now...")
        for dir_path in missing_dirs:
            dir_path.mkdir(parents=True, exist_ok=True)
        print("✅ All missing directories have been created.")
    else:
        print("✅ All required directories exist.")

def train_yolo_model(data_yaml_path: Path, model_size='m'):
    """Train YOLOv8 model with optimized settings for large number of classes."""
    model = YOLO(f'yolov8{model_size}.pt')
    
    model.train(
        data=str(data_yaml_path),
        epochs=100,
        imgsz=640,
        batch=16,
        name='terrestrial_animals_detection',
        patience=50,
        save=True,
        device='cuda' if os.environ.get('CUDA_VISIBLE_DEVICES') else 'cpu',
        workers=8,
        pretrained=True,
        optimizer='auto',
        verbose=True,
        seed=42,
        cos_lr=True,  # Cosine learning rate scheduling
        close_mosaic=10,  # Disable mosaic augmentation in final epochs
        box=7.5,  # Box loss gain
        cls=0.5,  # Classification loss gain
        dfl=1.5,  # DFL loss gain
        mixup=0.2,  # Mixup augmentation
        copy_paste=0.1,  # Copy-paste augmentation
    )
    
    return model

if __name__ == "__main__":
    BASE_PATH = Path("Dataset")

    # Ensure base directory exists
    BASE_PATH.mkdir(exist_ok=True)

    # Create dataset.yaml only if it does not exist
    yaml_path = create_yaml_config(BASE_PATH)

    # Verify and fix dataset structure
    verify_and_fix_dataset_structure(BASE_PATH)

    # Train YOLO model
    model = train_yolo_model(yaml_path, model_size='m')

    # Validate the model
    metrics = model.val()

    print("🎯 Training completed. Model saved in 'runs/detect/terrestrial_animals_detection'")
