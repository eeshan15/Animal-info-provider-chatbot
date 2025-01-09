import os
import time
from datetime import datetime
from undetected_chromedriver import Chrome, ChromeOptions
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from PIL import Image
from io import BytesIO
import requests

class microjob:
    def __init__(self):
        # Initialize Chrome options and driver
        self.chrome_options = ChromeOptions()
        self.chrome_options.binary_location = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"  # Replace with your Chrome binary path
        self.driver = Chrome(options=self.chrome_options)

    def create_folders(self, animal_list):
        """Creates folders for animals."""
        main_folder = "Aquatic_Animals"
        os.makedirs(main_folder, exist_ok=True)

        for animal in animal_list:
            species_folder = os.path.join(main_folder, animal.replace(' ', '_'))
            os.makedirs(species_folder, exist_ok=True)  # Create one folder for each animal

    def resize_image(self, img, target_size=(512, 512)):
        """Zooms and resizes the image to fit within the target size."""
        # Resize the image to fit the target size while preserving aspect ratio
        img_ratio = img.width / img.height
        target_ratio = target_size[0] / target_size[1]
    
        if img_ratio > target_ratio:
            # Image is wider than the target
            new_width = target_size[0]
            new_height = int(new_width / img_ratio)
        else:
            # Image is taller than the target
            new_height = target_size[1]
            new_width = int(new_height * img_ratio)
    
        img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
    
        # Now, crop the image to the center if it's larger than 512x512
        left = (new_width - target_size[0]) // 2
        top = (new_height - target_size[1]) // 2
        right = (new_width + target_size[0]) // 2
        bottom = (new_height + target_size[1]) // 2
    
        img = img.crop((left, top, right, bottom))
    
        # If image is smaller than target, add padding (white background) to reach 512x512
        new_img = Image.new("RGB", target_size, (255, 255, 255))
        new_img.paste(img, ((target_size[0] - img.width) // 2, (target_size[1] - img.height) // 2))
    
        return new_img

    def download_images(self, animal, subfolder_path, count, gender):
        """Download images using Selenium and save them."""
        search_query = f"Single {animal} {gender} 512x512".replace(' ', '+')  # Include gender in the search
        url = f"https://www.google.com/search?q={search_query}&tbm=isch"
        
        self.driver.get(url)
        time.sleep(2)  # Allow the page to load

        # Scroll down to load more images
        body = self.driver.find_element(By.TAG_NAME, "body")
        for _ in range(5):
            body.send_keys(Keys.PAGE_DOWN)
            time.sleep(1)

        downloaded = 0
        for image_no in range(1, count + 1):
            if downloaded >= count:
                break
            try:
                # XPath for thumbnail image
                thumbnail_xpath = f"/html/body/div[3]/div/div[15]/div/div[2]/div[2]/div/div/div/div/div[1]/div/div/div[{image_no}]/div[2]/h3/a/div"
                high_res_xpath = "/html/body/div[12]/div[2]/div[3]/div/div/c-wiz/div/div[2]/div[2]/div/div[2]/c-wiz/div/div[3]/div[1]/a/img[1]"
                high_res_xpath_2 = "/html/body/div[11]/div[2]/div[3]/div/div/c-wiz/div/div[2]/div[2]/div/div[2]/c-wiz/div/div[3]/div[1]/a/img[1]"
                # Click on the thumbnail image to open high-resolution view
                thumbnail_element = self.driver.find_element(By.XPATH, thumbnail_xpath)
                thumbnail_element.click()
                time.sleep(2)  # Wait for high-resolution image to load

                # Get high-resolution image URL
                try:
                    high_res_element = self.driver.find_element(By.XPATH, high_res_xpath)
                    img_url = high_res_element.get_attribute("src")
                except:
                    high_res_element = self.driver.find_element(By.XPATH, high_res_xpath_2)
                    img_url = high_res_element.get_attribute("src")

                if not img_url or img_url.startswith("data:image"):  # Skip invalid or base64-encoded images
                    continue

                # Download and save the high-resolution image
                response = requests.get(img_url, stream=True, timeout=5)
                img = Image.open(BytesIO(response.content))

                # Ensure image is in RGB mode
                if img.mode != 'RGB':
                    img = img.convert('RGB')

                # Resize the image to 512x512
                resized_img = self.resize_image(img, target_size=(512, 512))

                file_name = os.path.join(subfolder_path, f"{gender}_{downloaded + 1}.jpg")
                resized_img.save(file_name)

                downloaded += 1
                print(f"Downloaded {gender} image {downloaded} for {animal}.")
                
                # Close the high-resolution view
                self.driver.find_element(By.TAG_NAME, "body").send_keys(Keys.ESCAPE)
                time.sleep(1)

            except Exception as e:
                print(f"Error downloading image for {animal} ({gender}): {e}")

    def scrape_and_organize_images(self, animal_list):
        """Scrapes and organizes images for animals."""
        for animal in animal_list:
            print(f"Processing {animal}...")
            species_folder = os.path.join("Aquatic_Animals", animal.replace(' ', '_'))
            self.download_images(animal, species_folder, 80, "Male")
            self.download_images(animal, species_folder, 80, "Female")

    def close_driver(self):
        """Closes the Selenium driver."""
        self.driver.quit()

# Main function
def main():
    animal_list = [
        "Chinese Sturgeon", "Mekong Giant Catfish", "Asian Arowana", "Giant Freshwater Stingray", 
        "Indian Salmon", "Catla", "Taimen", "Mahseer", "Brahmaputra River Catfish",
        "Irrawaddy Dolphin", "South Asian River Dolphin", "Green Sea Turtle", "Olive Ridley Turtle", "Hawksbill Turtle", 
        "Leatherback Sea Turtle", "Sperm Whale", "Blue Whale", "Fin Whale", "Beluga Whale",
        "King Cobra", "Saltwater Crocodile", "Crocodile Monitor", "Chinese Alligator", "Indian Flap-Shelled Turtle",
        "Chinese Giant Salamander", "Asian Bullfrog", "Indian Bullfrog", "Malabar Gliding Frog", "Bornean Flat-Headed Frog",
        "Gharial", "Mugger Crocodile", "Indian Crocodile", "Freshwater Turtle", "Indian Carp", "Indian Catfish", 
        "Freshwater Shrimp", "Indian River Shad", "Labeo Fish", "Asian Sea Bass",
        "Water Buffalo", "Asian Elephant", "Water Vole", "Crab", "Asian Water Monitor", "Mudskipper", 
        "Asian Catfish", "Indian Snail", "Freshwater Eel", "Mekong River Eel"
    ]
    job = microjob()
    job.create_folders(animal_list)
    job.scrape_and_organize_images(animal_list)
    job.close_driver()

if __name__ == "__main__":
    main()
