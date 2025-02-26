# Technical Documentation for Kateb Categories

### Introduction

This document provides an overview of the different categories available on kateb. The categories are crucial for organizing content such as courses, discussions, and advertisements. Understanding these categories will help users navigate the site more effectively and engage with the content relevant to their interests.

### Categories Overview

Kateb is structured around five main categories:

1. **University**
1. **School**
1. **Skill**
1. **Deep Learning**
1. **College**

Each of these categories has specific subcategories that are displayed based on the selection made by the user. Below is a detailed description of each main category and its respective subcategories.

#### 1. University

When the **University** category is selected, the following subcategories are displayed:

- **Academic Field**: Represents the broader area of study, such as Science, Arts, Engineering, etc.
- **Academic Branch**: Refers to a specific discipline or specialization within an academic field, such as Computer Science under the field of Science.
- **Academic Group**: Denotes a collection of related academic branches or courses, allowing for a more focused study area.

##### Example Use Cases:

- Creating a course in Computer Science.
- Facilitating discussions about advancements in Engineering.

#### 2. School

Selecting the **School** category reveals the following subcategories:

- **Grade**: Indicates the

- level, such as Kindergarten, Elementary, Middle School, or High School.
- **Main Group**: Represents the primary subject areas, such as Mathematics or Science.
- **Side Group**: Refers to secondary subject areas that complement the main group, such as Physical Education or Arts.
- **Field**: Represents broader educational objectives, such as STEM (Science, Technology, Engineering, and Mathematics).
- **Branch**: Specific subjects or topics under the main field, such as Algebra under Mathematics.

##### Example Use Cases:

- Creating a course for 10th-grade Mathematics.
- Advertising an after-school program in Arts.

#### 3. Skill

When the **Skill** category is selected, the following subcategories are available:

- **Main Group**: Represents the primary skills, such as Technical Skills or Soft Skills.
- **Side Group**: Refers to supplementary skills that enhance the main group, such as Leadership Skills alongside Soft Skills.

##### Example Use Cases:

- Developing a course on Technical Skills for job readiness.
- Starting a discussion on the importance of Soft Skills in the workplace.

#### 4. Deep Learning

The **Deep Learning** category mirrors the **University** category, displaying similar subcategories:

- **Academic Field**
- **Academic Branch**
- **Academic Group**

##### Example Use Cases:

- Creating advanced courses in Artificial Intelligence.
- Hosting discussions on the latest research in Deep Learning.

#### 5. College

Selecting the **College** category provides only one subcategory:

- **Main Group**: Represents the primary fields of study available at the college level, such as Business, Healthcare, or Arts.

##### Example Use Cases:

- Developing a marketing campaign for a new Business Administration course.
- Organizing discussions about trends in Healthcare education.

### API Usage

To retrieve the list of categories and filter them based on the selected section, you can use the following cURL command:

```bash
[curl --location 'https://hamito.me/api/v1/categories' \](curl --location 'https://hamito.me/api/v1/categories' \)
--header 'Content-Type: application/json' \
--data '{
    "section": "school",  // Replace with desired section (university, school, skill, deep_learn, college)
    "type": "field",       // Specify the type to filter further if necessary
    "version": 2
}'
```

#### Parameters:

- **section**: The category you want to filter (university, school, skill, deep_learn, college).
- **type**: Further specifies the type of data you wish to retrieve (e.g., field, branch).
- **version**: Indicates the version of the API you are accessing.

#### Example Command:

To retrieve the fields related to the **School** section, the command would look like this:

```bash
[curl --location 'https://hamito.me/api/v1/categories' \](curl --location 'https://hamito.me/api/v1/categories' \)
--header 'Content-Type: application/json' \
--data '{
    "section": "school",
    "type": "field",
    "version": 2
}'
```

### Conclusion

Understanding the categories and subcategories of kateb is essential for effectively creating courses, facilitating discussions, and engaging in advertisements. This document serves as a guide for beginners to navigate the categories and utilize them to their fullest potential. For any further assistance or inquiries, please refer to the website's support resources.
