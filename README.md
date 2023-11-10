Readme# Unjected

# Prerequisites
 To run this project you must have installed these Packages and dependencies.
	
 1.Python3.
		
	
	sudo apt-get install python3
	
 2.pip3.
	
	
	sudo apt-get install python3-pip
	
	
## Installation

Use the package manager pip to install requirements.txt.


	pip3 install -r requirements.txt --user

# Getting Started
	
1. Remove migrations from all apps.
	
2. Run this command for makemigrations.
		
	python3 manage.py makemigrations
			
3. Run this command for migrate 
		
	python3 manage.py migrate
			
4. Run this command to create superuser.
		
	python3 manage.py createsuperuser
			
5. Run this command for default parameters

	python3 manage.py add_default


6. For Demo/Dev server changes Setting files Params of database and static/media files routes
			

# Running the project:

To run this project run this command on your terminal:

   python3 manage.py runserver