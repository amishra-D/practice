
function generateTimetable() {
    const numPeriodsLower = parseInt(document.getElementById("periodsLower").value);
    const numPeriodsUpper = parseInt(document.getElementById("periodsUpper").value);

    const classes = [];
    const numClasses = parseInt(document.getElementById("numClasses").value);

    for (let i = 1; i <= numClasses; i++) {
        const className = `Class ${i}`;
        const numSections = parseInt(document.getElementById(`sections${i}`).value);
        if (numSections < 2 || numSections > 5) {
            alert(`Number of sections for ${className} must be between 2 and 5.`);
            return;
        }
        const subjectInput = document.getElementById(`subjects${i}`).value;
        const subjects = subjectInput.split(",").map(s => s.trim());
        classes.push({ name: className, subjects, numSections });
    }

    const numDays = 5;

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function createTimetable(numPeriods, subjects) {
        const timetable = {};
        for (let day = 0; day < numDays; day++) {
            timetable[day] = {};
            const shuffledSubjects = shuffleArray([...subjects]);
            for (let period = 1; period <= numPeriods; period++) {
                const subject = shuffledSubjects.pop() || "";
                if (subject) {
                  const teacher =  String.fromCharCode(65 + Math.floor(Math.random() * 3)); // A, B, or C
                  timetable[day][period] = `${subject} (${teacher})`;
                } else{
                  timetable[day][period] = "";
                }
            }
        }
        return timetable;
    }

    const allTimetables = {};

    for (const cls of classes) {
        const numPeriods = cls.name.startsWith("Class 1") || cls.name.startsWith("Class 2") || cls.name.startsWith("Class 3") ? numPeriodsLower : numPeriodsUpper;
        allTimetables[cls.name] = {};
        for (let section = 1; section <= cls.numSections; section++) {
            allTimetables[cls.name][`Section ${section}`] = createTimetable(numPeriods, cls.subjects);
        }
    }

    displayTimetables(allTimetables);
}


function displayTimetables(timetables) {
    const outputDiv = document.getElementById("timetableOutput");
    outputDiv.innerHTML = "";

    for (const className in timetables) {
        const sections = timetables[className];
        const classTitle = document.createElement('h2');
        classTitle.textContent = className;
        outputDiv.appendChild(classTitle);

        for (const sectionName in sections) {
            const timetable = sections[sectionName];
            const sectionTitle = document.createElement('h3');
            sectionTitle.textContent = sectionName;
            outputDiv.appendChild(sectionTitle);

            const table = document.createElement("table");
            const headerRow = table.insertRow();
            headerRow.insertCell().textContent = "Day";
            const numPeriods = Object.keys(timetable[0]).length; //Dynamically get the number of periods
            for (let i = 1; i <= numPeriods; i++) {
                headerRow.insertCell().textContent = `Period ${i}`;
            }

            for (let day = 0; day < 5; day++) {
                const row = table.insertRow();
                const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
                row.insertCell().textContent = daysOfWeek[day];

                for (let period = 1; period <= numPeriods; period++) {
                    row.insertCell().textContent = timetable[day][period] || "";
                }
            }
            outputDiv.appendChild(table);
        }
    }
}



document.getElementById("generateButton").addEventListener("click", generateTimetable);