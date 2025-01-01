![image](https://github.com/user-attachments/assets/ad56f9d2-6c35-4149-87d5-95b2a20b6ef6)

## THIS README IS NOT FIXED AND WILL BE CHANGED AFTER THE PROJECT COMPLETION
## **Project Overview**
This project is a Flask-based application designed to integrate multiple components for handling imagery data, classifying animals, and providing detailed information about them through a custom QnA chatbot. The system uses MongoDB for storage, OpenCV for image classification, and a custom RAG (Retrieval-Augmented Generation) model for answering questions about animals based on a custom dataset.

---

## **Features**
1. **Image Classification:**
   - Users can upload images of animals.
   - OpenCV processes the image, and a machine learning model classifies the animal.

2. **Custom QnA Chatbot:**
   - Uses a custom-trained RAG model to answer user queries about animals.
   - Knowledge base includes books, datasets, and additional resources.

3. **MongoDB Integration:**
   - Imagery data and metadata are stored in MongoDB for efficient retrieval.

4. **Frontend Integration:**
   - Flask connects to a ReactJS/HTML-based frontend for user interaction.
   - Users can upload images and chat with the chatbot through a single interface.

5. **Modular Design:**
   - Supports multiple chatbots integrated into a single platform.

---

## **Architecture**
1. **Frontend:**
   - ReactJS/HTML for user interface.
   - Features include image upload and chatbot interaction.

2. **Backend (Flask):**
   - REST API endpoints for:
     - Image upload and classification.
     - Chatbot communication.
   - Modular architecture to manage multiple chatbots.

3. **Image Processing:**
   - OpenCV used for preprocessing and classification.
   - Model trained on labeled animal datasets using TensorFlow/PyTorch.

4. **Chatbot (RAG Model):**
   - Retrieval-Augmented Generation model trained on a custom animal dataset.
   - Combines a retriever for finding relevant knowledge and a generator for answering queries.

5. **Database:**
   - MongoDB for storing:
     - Images and metadata.
     - User queries and session history.
## **Architecture Diagram**
![SWOC_Project_Diagram drawio](https://github.com/user-attachments/assets/6180a546-f986-4513-ada4-328dda5d01e3)

---

## **Installation**
### **Prerequisites**
- Python 3.8+
- MongoDB
- Node.js (for frontend)
- OpenCV
- TensorFlow/PyTorch
- Flask

### **Steps**
1. **Clone the Repository:**
   ```bash
   git clone https://github.com/username/animal-classification-chatbot.git
   cd animal-classification-chatbot
   ```

2. **Set Up Backend:**
   - Install Python dependencies:
     ```bash
     pip install -r requirements.txt
     ```
   - Run the Flask server:
     ```bash
     python app.py
     ```

3. **Set Up Frontend:**
   - Navigate to the frontend directory:
     ```bash
     cd frontend
     ```
   - Install dependencies and start the frontend:
     ```bash
     npm install
     npm start
     ```

4. **Run MongoDB:**
   - Ensure MongoDB is running locally or use a cloud-based MongoDB instance.

---

## **Usage**
1. **Upload Image:**
   - Navigate to the frontend.
   - Upload an animal image.
   - The backend processes the image and returns the classification result.

2. **Interact with Chatbot:**
   - Ask questions about animals (e.g., "Tell me about lions").
   - The chatbot fetches relevant information from the custom knowledge base and provides detailed answers.

---

## **Endpoints**
### **Image Classification**
- **POST** `/classify`
  - Input: Image file
  - Output: Classified animal name and confidence score.

### **Chatbot**
- **POST** `/chatbot`
  - Input: User query
  - Output: Chatbot response.

---

## **Tech Stack**
- **Frontend:** ReactJS, HTML, CSS
- **Backend:** Flask, OpenCV, TensorFlow/PyTorch
- **Database:** MongoDB
- **Chatbot:** Custom RAG model

---

## **Future Enhancements**
1. Add live camera feed processing for real-time animal classification.
2. Enhance chatbot with multilingual support.
3. Deploy the system on cloud platforms like AWS/GCP for scalability.
4. Integrate user authentication for personalized experiences.

---

## **Contributing**
Contributions are welcome! Please fork the repository and submit a pull request.

---

## **License**
This project is licensed under the MIT License. See `LICENSE` for more details.

---

Kuch aur customize karna ho toh bolna, bhai! 😊
