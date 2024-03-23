# CiSTUP, IISc: Round 1 Submission
##### Saatwik Vasistha, email: [saatwik.vasishtha@gmail.com](mailto:saatwik.vasishtha@gmail.com)
##### Demonstration: 
https://github.com/Teak-Rosewood/iisc-cistup-webdev/assets/88363398/be5c2b23-5b42-4cb3-b416-71d8849c60db
[Youtube Link](https://www.youtube.com/watch?v=HS3rAneNVmg)
## Docker Setup
Clone the repository and go into the directory
```
git clone https://github.com/Teak-Rosewood/iisc-cistup-webdev.git
cd iisc-cistup-webdev
```
Build the docker using docker compose
```
docker compose up 
```
Server runs at: [localhost:5000](http://localhost:5000)   
Client runs at: [localhost:3000](http://localhost:3000)  

To Stop the docker
```
docker compose stop
```
## Setup Locally
### Requirements
1. Conda
2. Node v20 
3. Python 3.9 (without conda)
### General 
Clone the repository
```
git clone https://github.com/Teak-Rosewood/iisc-cistup-webdev.git 
cd iisc-cistup-webdev
```
### Server
Create a new conda environment or a python environment with Python 3.8.  
Note: If you wish to not use conda, you must have python 3.9 installed locally

```
conda create --name myenv python=3.9
conda activate myenv
```
Install dependencies and model
```
cd server
pip install -r requirements.txt
python model/saveModel.py
```
Run the server using gunicorn with 4 processes on port:8000
```
gunicorn -w 4 app:app
```
