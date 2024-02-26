import "./styles.css";
import Filter from "./components/Filter";
import Gantt, { Config } from "./components/Gantt";
import Gantt2 from "./components/Gantt2";
import Avatars from "./components/StackedAvatar";
import HDraggable from "./components/HDraggable";
import HorizontalDrag from "./components/HorizontalDrag";
import { faker } from "@faker-js/faker";

interface Task {
  id: number;
  parent?: number;
  dependencies?: Array<number>;
  order: number;
  title: string;
  link?: string;
  start: Date;
  end: Date;
  plannedStart?: Date;
  plannedEnd?: Date;
  neededBy?: Date;
  assignedTo?: string;
  avatar?: string;
  pcComplete?: number;
  color: string;
}

export default function App() {
  const ganttConf: Config = {
    start: new Date("2023-1-1"),
    end: new Date("2024-8-30"),
  };

  function createRandomTask(): Task {
    const dates: Date[] = faker.date.betweens({
      from: ganttConf.start,
      to: ganttConf.end,
      count: 2,
    });
    const s = dates[0] <= dates[1] ? dates[0] : dates[1];
    const e = dates[0] > dates[1] ? dates[0] : dates[1];
    return {
      id: faker.number.int(200),
      parent: faker.number.int(200),
      dependencies: [],
      order: faker.number.int(200),
      title: faker.lorem.words(),
      link: faker.internet.url(),
      start: s,
      end: e,
      plannedStart: faker.date.between({
        from: ganttConf.start,
        to: ganttConf.end,
      }),
      plannedEnd: faker.date.between({
        from: ganttConf.start,
        to: ganttConf.end,
      }),
      neededBy: faker.date.between({
        from: ganttConf.start,
        to: ganttConf.end,
      }),
      assignedTo: faker.internet.userName(),
      avatar: faker.image.avatar(),
      pcComplete: faker.number.int(100),
      color: faker.color.rgb({ prefix: "#", casing: "lower" }),
    };
  }

  const tasks: Task[] = faker.helpers.multiple(createRandomTask, {
    count: 25,
  });
  // const ganttData = [
  //   {
  //     id: 1,
  //     order: 1,
  //     title: "task 1",
  //     start: new Date("2023-1-1"),
  //     end: new Date("2023-1-10"),
  //     color: "#588bae",
  //   },
  //   {
  //     id: 2,
  //     order: 2,
  //     title: "task 2",
  //     start: new Date("2023-2-3"),
  //     end: new Date("2023-2-10"),
  //     color: "#73c2fb",
  //   },
  //   {
  //     id: 3,
  //     order: 3,
  //     title: "task 3",
  //     start: new Date("2023-1-15"),
  //     end: new Date("2023-5-23"),
  //     color: "#73c2fb",
  //   },
  // ];
  return (
    <div className="App">
      <h2>Gantt Chart v1</h2>
      <Filter></Filter>
      <Gantt config={ganttConf} data={tasks}></Gantt>
      <Gantt2 config={ganttConf} data={tasks}></Gantt2>
      <Avatars />
      <HDraggable />
      <HorizontalDrag />
    </div>
  );
}

/*
// TODO:
- on the grid 2 add the vertical and horizontal lines
- freeze (or fix) the first column and row
- Add the days on the Calendar (M, T, W etc)
- Shade the weekends, and public holidays
- Highlight today's date
- pass in the start and end dates from filter
- pass in resolution (daily, weekly, monthly, quarterly, yearly)
- show/hide out weekends, holidays
- add the parent for each task, and collapse/aggregate (time, estimate, effort) to parent
- add extra fields: task id, parent id, task name, description, assigned to, % complete, planned start/end dates, actual start/end, needed by etc
- show/hide the fields
- add the resource time outs for the planning
- how many resources are available per sprint

-- Add leaderlines
Recently, I have tried to develop a simple web app that uses drag and drop components and has lines connecting them. I came across these two simple and amazing javascript libraries:

Plain Draggable: simple and high performance library to allow HTML/SVG element to be dragged.
https://anseki.github.io/plain-draggable/

Leader Line: Draw a leader line in your web page
http://anseki.github.io/leader-line/

Working example link (usage: click on add scene to create a draggable, click on add choice to draw a leader line between two different draggables)
https://cherub7.github.io/Story-graph/pages/story_builder.html

jsplumkit: jsplumbtoolkit.com/home/jquery.html
*/

/*
Joining lines with svgs was worth a shot for me, and it worked perfectly... first of all, Scalable Vector Graphics (SVG) is an XML-based vector image format for two-dimensional graphics with support for interactivity and animation. SVG images and their behaviors are defined in XML text files. you can create an svg in HTML using <svg> tag. Adobe Illustrator is one of the best software used to create an complex svgs using paths.

Procedure to join two divs using a line :

create two divs and give them any position as you need

<div id="div1" style="width: 100px; height: 100px; top:0; left:0; background:#e53935 ; position:absolute;"></div>
<div id="div2" style="width: 100px; height: 100px; top:0; left:300px; background:#4527a0 ; position:absolute;"></div>
(for the sake of explanation I am doing some inline styling but it is always good to make a separate css file for styling)

<svg><line id="line1"/></svg>

Line tag allows us to draw a line between two specified points(x1,y1) and (x2,y2). (for a reference visit w3schools.) we haven't specified them yet. because we will be using jQuery to edit the attributes (x1,y1,x2,y2) of line tag.

in <script> tag write

line1 = $('#line1');   
div1 = $('#div1');   
div2 = $('#div2');
I used selectors to select the two divs and line...

var pos1 = div1.position();
var pos2 = div2.position();
jQuery position() method allows us to obtain the current position of an element. For more information, visit https://api.jquery.com/position/ (you can use offset() method too)

Now as we have obtained all the positions we need we can draw line as follows...

line1
  .attr('x1', pos1.left)
  .attr('y1', pos1.top)
  .attr('x2', pos2.left)
  .attr('y2', pos2.top);
jQuery .attr() method is used to change attributes of the selected element.

All we did in above line is we changed attributes of line from

x1 = 0
y1 = 0
x2 = 0
y2 = 0
to

x1 = pos1.left
y1 = pos1.top
x2 = pos2.left
y2 = pos2.top
as position() returns two values, one 'left' and other 'top', we can easily access them using .top and .left using the objects (here pos1 and pos2) ...

Now line tag has two distinct co-ordinates to draw line between two points.

Tip: add event listeners as you need to divs

Tip: make sure you import jQuery library first before writing anything in script tag

After adding co-ordinates through JQuery ... It will look something like this

Following snippet is for demonstration purpose only, please follow steps above to get correct solution

<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
<div id="div1" style="width: 100px; height: 100px; top:0; left:0; background:#e53935 ; position:absolute;"></div>
<div id="div2" style="width: 100px; height: 100px; top:0; left:300px; background:#4527a0 ; position:absolute;"></div>
<svg width="500" height="500"><line x1="50" y1="50" x2="350" y2="50" stroke="red"/></svg>
*/
