Routes
/login -> Login and resiter
/tasks -> Only to logged in users
/

Login should be a route

Logged in -> Take user to /tasks

Ignore the existance of a landing page for now

State or database calls?

Do you really need a sidebar?

What functionality does it provide that the main part does not?

Yeah we dont need a sidebar for now

So login -> /tasks -> User can use the app

Wait

How do you go about making the main app

A database call for each action? Or a button to save

A button to save it is

Wait we also need to add the spaced learning feature

Data:

How will the database look like?

id, username, password, tasks -> [
{'Date': [tasks for the day]},
{'Date': [tasks for the day]}
]

How will react state look like?
We can set state at the task-card container
state = [
{'Date': [tasks for the day]},
{'Date': [tasks for the day]}
]
The state should update whenever a new task card is created
The state shoull update whenever a new task is created

When should the database update?
Not every keystroke
On save yes
When user clicks on save send the current client side state to database
