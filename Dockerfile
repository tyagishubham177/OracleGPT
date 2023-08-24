FROM python:3.10.6

# Set the working directory
WORKDIR /usr/src/app

# Install the requirements
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the code
COPY . .

# Command to run the application
CMD ["python", "app.py"]