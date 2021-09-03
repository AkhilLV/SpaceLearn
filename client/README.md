User Stories

# /tasks

If new user:
User sees a modal asking user to create their first task-card

If old User:
User sees there existing cards.

# What is a card: A card can be created, edited, deleted. A modal pops up asking the user the name of the card and a start date. One card is created for four days. The card shows the dates of the said four days.The current day is highlighted. A days task cannot be crosses over if current day < said date. A cards name and date can be edited. On updating the staring date, new spaced learning dates are generated. Each card can have tasks associated with it. When a user clicks on a button to add a task, an input field shows up. Unfocusing/pressing return creates a task. A card is marked completed when all tasks are done. A card can be reset if the user needs to study again.

# User Input required for a card: A date and a card name; so that a user can have multiple cards for the same day if he chooses to.

What is a task: A task can be created, edited, deleted. A Task can marked completed on cliking the circle to the left of it. A crossed card is pushed down to the bottom of a card. It can be edited by clicking on it. It can be deleted by clicking on the trash button. The tasks are independent for each day. A task is edited and deleted for all four days.

Data Structure:
...

Components: Data required

1. Card: card_id, card_date,
2. Task: task_id, task_text, task_completed
