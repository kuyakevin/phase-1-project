# Status Update

7/2/2022: This project will most likely be worked on from time to time. As of today's date, everything is up to date and functioning. However, the app will not work the next day because I don't know how to set up oauth, nor understand how to deal with that realm of APIs and have been relying on manually obtaining a new url. Any help would be greatly appreciated! 

# Topdeck Trump

Topdeck Trump is a minigame that compares a limited database of legendary hearthstone cards. The user plays a game versus "the computer." The main objective of the game is to correctly guess which card stat is better than the coomputer's card stat. 

# Background

Hearthstone is a card game made by Blizzard Entertainment.

![Hearthstone Card](https://static.wikia.nocookie.net/hearthstone_gamepedia/images/4/4a/EX1_559_Premium1.png/revision/latest?cb=20220123081912)

A hearthstone card will consist of 3 main values: Mana Cost, Attack, and Health. 

![Mana Cost](photos/manaCost.jpg)

Mana Cost represents how much mana is required to play that card. The Mana Cost of a card can be found on the top left of the card. 

![Attack](photos/attackValue%20Small.jpeg) ![Health](photos/HealthValue.jpg)

Attack represents how much attack power a card has, while Health represents how much health points a card has. If two cards battle, they both do damange to each other. If the attack value exeeds the health value, then the card is destroyed. It is very much possible that when two cards battle, both cards can be destroyed. The attack value can be found on the botton right corner as a sword symbol, while the health value can be found on the bottom right as a blood drop background.

![Textbox](photos/Textbox%20Small.jpeg)

Most cards also have en effect that can be seen in the box below the portrait. Generally cards that have a multi round effect will tend to have a higher Mana Cost. This is also the same for cards that have higher Attack and Health values. 

![CroppedIImage](photos/crop.png)

Frequent hearthstone players should be able to use in game knowledge to make the correct guess. For others, they will have to use inductive reasoning based off of only two things: the image, and the effect. Good luck and have fun! 

# Features

<h2>Fullscreen Mode</h2>
Press the __enter__ key to enter and exit fullscreen mode.

<h2>Dark Mode</h2>
Press the ☀️ button to change to dark mode. The background will turn black and relative text will invert to white.

# Future Goals/Current Issues

<h2>Guaranteed Wins and Losses</h2>
Currently there is a logic flaw that hinders gameplay. There is an issue where one card can have better stats than the other in each category, creating scenarios where the user will have a guaranteed win or guaranteed loss. To address this, logical operators will have to be put into place so only one stat will be greater than the other card, so the user will only have one stat to guess correctly, while the other two stats will result in a loss. 

<h2>OAuth</h2>
The app will not work on a daily basis due to the OAuth key expiring after 24 hours, and there is no renewal function set in place in this program. Better understandment on how to set up OAuth properly will fix this. 

<h2>Switch between card games</h2>
I want to eventually add a selector of other card games to apply to this program. Some examples include Magic The Gathering, Yu-Gi-Oh, and Pokemon. Adding a dropdown menu to select another card game will be a hopeful addition in the future. 