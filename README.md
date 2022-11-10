# EasyHire

## Project Description

Are you looking for someone to design a logo or build a website for you but don't know where to find? Look no further because EasyHire is here to solve that problem. Individual and businesses now can list their job on our website and wait for a suitable bid from a freelancer on the site!

## User Story

EasyHire is a platform that connects freelancers with individual and businesses that are looking to hire. When signing up, each User should provide a name, an email and a password to create an account.

### Authentication

- As a user, I can sign in with my email and password.
- As a user, I can register a new account by name, email and password.
- As a user, I can stay signed in after refreshing the page

### Users

- As a user, I can list a new job.
- As a user, I can view and update my profile info.
- As a user, I can choose to become a freelancer.
- As a user, I can view profile of a freelancer.
- As a user, I can view list of all freelancers.

### Jobs

- As a user, I can view all jobs listed.
- As a user, I can view my job listings.
- As a user, I can edit my job listings.
- As a user, I can delete my job listings.
- As a freelancer, I can bid for a listed job.

### Reviews

- As a user, I can review a freelancer that finished my job.
- As a user, I can see all the reviews of a freelancer.

### Bids

- As a freelancer, I can bid for listed jobs.
- As a freelancer, I can change my bids.
- As a freelancer, I can cancel my bids.
- As a freelancer, I can view all my bids.
- As a user, I can accept or reject bids on my job listings.
- As a user, I can view all the bids on my job listings.

## API endpoints

### Auth APIs

> - @route POST /auth/login
> - @description Log in with email and password
> - @body {email, password}
> - @access public

### Job APIs

> - @route GET /jobs?page=1&limit=10
> - @description Get job list with pagination
> - @body
> - @access public

> - @route GET /jobs/:id
> - @description Get job detail
> - @body
> - @access login required

> - @route GET /jobs/:id/bids
> - @description Get all bids of a job
> - @body
> - @access login required

> - @route POST /jobs
> - @description List a new job
> - @body {title, industry, description, image}
> - @access login required

> - @route PUT /jobs/:id
> - @description Edit a listed job
> - @body {title, industry, description, image}
> - @access login required

> - @route DELETE /jobs/:id
> - @description Delete a job listing
> - @body
> - @access login required

### User APIs

> - @route GET /users/freelancers
> - @description Get all users with the freelancer role
> - @body
> - @access public

> - @route GET /users/me
> - @description Get current user profile
> - @body
> - @access login required

> - @route GET /users/:id
> - @description Get profile of a user
> - @body
> - @access login required

> - @route GET /users/:id/bids
> - @description Get all bids of current user
> - @body
> - @access login required

> - @route POST /users
> - @description Register for a new user
> - @body {name, email, password}
> - @access public

> - @route PUT /users/:id
> - @description Update user profile
> - @body {name, role, industry, company, skills, avatarUrl, about me}
> - @access login required

### Review APIs

> - @route GET /reviews/:userId
> - @description Get all reviews of a user
> - @body
> - @access login required

> - @route POST /reviews/:jobId
> - @description Write a review for a user
> - @body {rating, comment}
> - @access login required

### Bid APIs

> - @route POST /bids/:jobId
> - @description Bid for a job
> - @body {price}
> - @access login required

> - @route PUT /bids/:id
> - @description Update a bid
> - @body {price}
> - @access login required

> - @route DELETE /bids/:id
> - @description Delete a bid
> - @body {status}
> - @access login required

## Entity Relationship Diagram

![](https://i.imgur.com/7FNmLWE.png)
