(https://media.giphy.com/media/YsNVlqrQkvLuaeILSO/giphy.gif)

# Alaska's Salmon Fishery in Numbers

Welcome to Alaska's Salmon Fishery, an interactive data visualization of the 
salmon catch in Alaska measured in pounds from 1997 to 2020.
This webpage allows users to view the data in two ways; they can view all the 
amounts caught in every area for a certain year or they can view all the amounts 
caught in a single area for every year.
This webpage also provides a brief introduction to the five species of salmon fished in Alaska. 
The data is divided between the five species of fish.
The data was taken from the Alaska Department of Fish and Games website and can be found [here](https://www.adfg.alaska.gov/index.cfm?adfg=CommercialByFisherySalmon.main).

# Where can I see it?
Alaska's Salmon Fishery in Numbers is hosted live at https://evrtt.github.io/Alaskas-Salmon-Fishery-in-Numbers/

# Technologies

Alaska's Salmon Fishery in Numbers was developed with:

* Vanilla Javascript

* D3.js

* Node.js

# Highlited Features

## Zoom to Bounding Box

This application makes heavy use of D3's powerful library to geographically render the data. 
The outline of the state of Alaska and rectangles approcximating each area where data was collected are
rendered using a Mercator projection of the states GeoJSON object, and lat-long coordinates for eacha area. 
Upon clicking on each area, the SVG containing the images is scaled in to view just that area and a chart 
of the area is then rendered. Using D3's .transition() in conjunction with this scaling, a zooming in and out effect is acheived.

## Force Bubble Graph

Eleven force simulations are generated using D3's .force() to create clusters of circles for each area where data was collected.
These simulations allow for animated rendering of circles that illustrate the amount in pounds of fish caught. 
To accomodate a massive range in numbers, D3's linear scaling function was used to scale the data into a reasonable range. 

## Stacked Area Chart

To accomodate five seperate peices of data in one column in a bar chart, 
D3's stacking function was used to join the catch data of the five species for each year. 

## Varied Data Viewing Options

In order to view the data by year or by area, D3 was used in conjunction with two functions to convert a 
CSV file into tow seperate javascript objects.

