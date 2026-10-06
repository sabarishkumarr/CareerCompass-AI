-- Skills
INSERT INTO skills (name, category, description) VALUES
('Python', 'Programming', 'High-level programming language for data science and web development'),
('Java', 'Programming', 'Object-oriented programming language for enterprise applications'),
('JavaScript', 'Programming', 'Core language for web development'),
('TypeScript', 'Programming', 'Typed superset of JavaScript'),
('C++', 'Programming', 'High-performance programming language'),
('C', 'Programming', 'Low-level systems programming language'),
('Go', 'Programming', 'Concurrent systems programming language'),
('Kotlin', 'Programming', 'Modern Android development language'),
('Swift', 'Programming', 'iOS and macOS development language'),
('R', 'Programming', 'Statistical computing and graphics'),
('React', 'Web', 'JavaScript library for building user interfaces'),
('Angular', 'Web', 'Platform for building mobile and desktop web applications'),
('Vue.js', 'Web', 'Progressive JavaScript framework'),
('Node.js', 'Web', 'JavaScript runtime built on Chrome V8'),
('Spring Boot', 'Web', 'Framework to create stand-alone Spring applications'),
('Django', 'Web', 'High-level Python web framework'),
('FastAPI', 'Web', 'Modern, fast web framework for building APIs with Python'),
('HTML5', 'Web', 'Markup language for structuring web pages'),
('CSS3', 'Web', 'Style sheet language used for describing presentation'),
('REST API', 'Web', 'Architectural style for distributed hypermedia systems'),
('PostgreSQL', 'Databases', 'Open source object-relational database system'),
('MySQL', 'Databases', 'Open-source relational database management system'),
('MongoDB', 'Databases', 'Source-available cross-platform document-oriented database program'),
('Redis', 'Databases', 'In-memory data structure store'),
('Elasticsearch', 'Databases', 'Distributed, RESTful search and analytics engine'),
('Oracle', 'Databases', 'Multi-model database management system'),
('Firebase', 'Databases', 'Platform developed by Google for creating mobile and web applications'),
('Pandas', 'Data Science', 'Data manipulation and analysis software library for Python'),
('NumPy', 'Data Science', 'Library for the Python programming language adding support for large arrays'),
('Matplotlib', 'Data Science', 'Plotting library for the Python programming language'),
('Seaborn', 'Data Science', 'Python data visualization library based on matplotlib'),
('Jupyter', 'Data Science', 'Project Jupyter is a non-profit, open-source project'),
('TensorFlow', 'Data Science', 'End-to-end open source machine learning platform'),
('PyTorch', 'Data Science', 'Machine learning library based on the Torch library'),
('Scikit-learn', 'Data Science', 'Machine learning library for the Python programming language'),
('Machine Learning', 'Machine Learning', 'Study of computer algorithms that improve automatically through experience'),
('Deep Learning', 'Machine Learning', 'Part of a broader family of machine learning methods based on artificial neural networks'),
('NLP', 'Machine Learning', 'Natural language processing'),
('Computer Vision', 'Machine Learning', 'Field of artificial intelligence that trains computers to interpret and understand the visual world'),
('XGBoost', 'Machine Learning', 'Optimized distributed gradient boosting library'),
('Feature Engineering', 'Machine Learning', 'Process of using domain knowledge to extract features from raw data'),
('AWS', 'Cloud', 'Amazon Web Services cloud computing platforms'),
('Azure', 'Cloud', 'Microsoft Azure cloud computing service'),
('Google Cloud', 'Cloud', 'Google Cloud Platform'),
('Docker', 'Cloud', 'Set of platform as a service products that use OS-level virtualization to deliver software in packages called containers'),
('Kubernetes', 'Cloud', 'Open-source container-orchestration system'),
('Terraform', 'Cloud', 'Open-source infrastructure as code software tool'),
('Git', 'DevOps', 'Distributed version-control system for tracking changes in source code'),
('GitHub', 'DevOps', 'Provider of Internet hosting for software development and version control using Git'),
('CI/CD', 'DevOps', 'Continuous integration and continuous delivery'),
('Jenkins', 'DevOps', 'Open source automation server'),
('Linux', 'DevOps', 'Family of open-source Unix-like operating systems'),
('Bash', 'DevOps', 'Unix shell and command language'),
('Nginx', 'DevOps', 'Web server that can also be used as a reverse proxy, load balancer, mail proxy and HTTP cache'),
('Public Speaking', 'Communication', 'Process or act of performing a speech to a live audience'),
('Technical Writing', 'Communication', 'Writing or drafting technical communication used in technical and occupational fields'),
('Team Collaboration', 'Communication', 'Working together to achieve a goal'),
('Presentation Skills', 'Communication', 'Skills required in delivering effective and engaging presentations'),
('Project Management', 'Leadership', 'Practice of initiating, planning, executing, controlling, and closing the work of a team'),
('Team Leadership', 'Leadership', 'Guiding a group of people'),
('Agile/Scrum', 'Leadership', 'Agile framework for managing knowledge work'),
('Decision Making', 'Leadership', 'Cognitive process resulting in the selection of a belief or a course of action'),
('Cybersecurity', 'Other', 'Protection of computer systems and networks'),
('UI/UX Design', 'Other', 'User interface and user experience design'),
('Figma', 'Other', 'Vector graphics editor and prototyping tool'),
('Product Management', 'Other', 'Organizational lifecycle function within a company dealing with the planning, forecasting, and production'),
('Data Analysis', 'Other', 'Process of inspecting, cleansing, transforming, and modeling data'),
('Statistics', 'Data Science', 'Mathematical analysis of numerical data and its interpretation'),
('SQL', 'Databases', 'Structured Query Language for managing relational databases'),
('Data Structures', 'Programming', 'Ways of organizing data for efficient access and modification'),
('Algorithms', 'Programming', 'Step-by-step procedures for calculations and problem solving'),
('Excel', 'Other', 'Spreadsheet application for data analysis and visualization'),
('Networking', 'Other', 'Computer networking fundamentals and protocols'),
('Ethical Hacking', 'Other', 'Penetration testing and ethical hacking techniques'),
('User Research', 'Other', 'Research methods for understanding user needs and behaviors'),
('Data Visualization', 'Data Science', 'Visual representation of information and data'),
('Microservices', 'Web', 'Software development technique structuring applications as collections of loosely coupled services');

-- Careers  
INSERT INTO careers (name, description, industry, avg_salary_min, avg_salary_max, growth_rate, demand_level) VALUES
('Software Developer', 'Design and develop software applications', 'Technology', 600000, 1800000, 'High', 'Very High'),
('Full Stack Developer', 'Develop both frontend and backend software', 'Technology', 700000, 2000000, 'Very High', 'Very High'),
('Data Analyst', 'Analyze data and generate insights', 'Data', 500000, 1500000, 'High', 'High'),
('Data Scientist', 'Apply advanced analytics and machine learning to solve complex problems', 'Data', 800000, 2500000, 'Very High', 'Very High'),
('Machine Learning Engineer', 'Design and build machine learning systems', 'AI', 900000, 3000000, 'Very High', 'Very High'),
('AI Engineer', 'Build and deploy AI models', 'AI', 1000000, 3500000, 'Very High', 'Very High'),
('Cloud Engineer', 'Design, implement and manage cloud infrastructure', 'Cloud', 800000, 2400000, 'High', 'High'),
('DevOps Engineer', 'Automate and streamline operations and processes', 'Cloud', 900000, 2600000, 'High', 'Very High'),
('Cybersecurity Analyst', 'Protect IT infrastructure and networks', 'Security', 700000, 2000000, 'Very High', 'High'),
('UI/UX Developer', 'Design and implement user interfaces', 'Design', 500000, 1600000, 'Medium', 'Medium'),
('Product Manager', 'Lead the product development lifecycle', 'Management', 1000000, 3500000, 'High', 'High'),
('Backend Developer', 'Develop server-side logic and databases', 'Technology', 700000, 1900000, 'High', 'Very High');

-- Career skills
INSERT INTO career_skills (career_id, skill_id, importance_level, min_proficiency)
SELECT c.id, s.id, 9, 70 FROM careers c, skills s WHERE c.name = 'Software Developer' AND s.name IN ('Java', 'Python', 'C++', 'Git', 'Linux', 'Team Collaboration');

INSERT INTO career_skills (career_id, skill_id, importance_level, min_proficiency)
SELECT c.id, s.id, 9, 70 FROM careers c, skills s WHERE c.name = 'Full Stack Developer' AND s.name IN ('JavaScript', 'React', 'Node.js', 'PostgreSQL', 'HTML5', 'CSS3', 'Git', 'Docker');

INSERT INTO career_skills (career_id, skill_id, importance_level, min_proficiency)
SELECT c.id, s.id, 8, 60 FROM careers c, skills s WHERE c.name = 'Data Analyst' AND s.name IN ('Python', 'PostgreSQL', 'Pandas', 'Data Analysis', 'Presentation Skills', 'Matplotlib', 'Statistics', 'SQL', 'Data Visualization', 'Excel');

INSERT INTO career_skills (career_id, skill_id, importance_level, min_proficiency)
SELECT c.id, s.id, 9, 75 FROM careers c, skills s WHERE c.name = 'Data Scientist' AND s.name IN ('Python', 'Machine Learning', 'Pandas', 'Scikit-learn', 'PostgreSQL', 'Jupyter');

INSERT INTO career_skills (career_id, skill_id, importance_level, min_proficiency)
SELECT c.id, s.id, 9, 80 FROM careers c, skills s WHERE c.name = 'Machine Learning Engineer' AND s.name IN ('Python', 'Machine Learning', 'Deep Learning', 'PyTorch', 'TensorFlow', 'Docker');

INSERT INTO career_skills (career_id, skill_id, importance_level, min_proficiency)
SELECT c.id, s.id, 10, 80 FROM careers c, skills s WHERE c.name = 'AI Engineer' AND s.name IN ('Python', 'Deep Learning', 'NLP', 'Computer Vision', 'PyTorch', 'TensorFlow');

INSERT INTO career_skills (career_id, skill_id, importance_level, min_proficiency)
SELECT c.id, s.id, 9, 75 FROM careers c, skills s WHERE c.name = 'Cloud Engineer' AND s.name IN ('AWS', 'Azure', 'Linux', 'Docker', 'Kubernetes', 'Bash');

INSERT INTO career_skills (career_id, skill_id, importance_level, min_proficiency)
SELECT c.id, s.id, 9, 80 FROM careers c, skills s WHERE c.name = 'DevOps Engineer' AND s.name IN ('Linux', 'Docker', 'Kubernetes', 'CI/CD', 'Jenkins', 'Git');

INSERT INTO career_skills (career_id, skill_id, importance_level, min_proficiency)
SELECT c.id, s.id, 9, 75 FROM careers c, skills s WHERE c.name = 'Cybersecurity Analyst' AND s.name IN ('Cybersecurity', 'Linux', 'Bash', 'Python', 'AWS', 'Technical Writing');

INSERT INTO career_skills (career_id, skill_id, importance_level, min_proficiency)
SELECT c.id, s.id, 9, 70 FROM careers c, skills s WHERE c.name = 'UI/UX Developer' AND s.name IN ('UI/UX Design', 'Figma', 'HTML5', 'CSS3', 'React', 'Team Collaboration');

INSERT INTO career_skills (career_id, skill_id, importance_level, min_proficiency)
SELECT c.id, s.id, 9, 80 FROM careers c, skills s WHERE c.name = 'Product Manager' AND s.name IN ('Product Management', 'Agile/Scrum', 'Project Management', 'Presentation Skills', 'Decision Making', 'Team Collaboration');

INSERT INTO career_skills (career_id, skill_id, importance_level, min_proficiency)
SELECT c.id, s.id, 9, 75 FROM careers c, skills s WHERE c.name = 'Backend Developer' AND s.name IN ('Java', 'Spring Boot', 'PostgreSQL', 'Redis', 'Docker', 'REST API', 'Git');
