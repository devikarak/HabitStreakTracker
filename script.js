// 1️⃣ DOM Elements
const addBtn = document.getElementById("addBtn");
const habitInput = document.getElementById("habitInput");
const habitList = document.getElementById("habitList");
const tips = document.getElementById("tips");

// 2️⃣ Data
let habits = JSON.parse(localStorage.getItem("habits")) || [];

// 3️⃣ Event Listener
addBtn.addEventListener("click", addHabit);

// 4️⃣ Add Habit Function
function addHabit() {
    if (habitInput.value.trim() === "") return;

    const habit = {
        name: habitInput.value,
        streak: 0,
        lastCompleted: null
    };

    habits.push(habit);
    saveHabits();
    habitInput.value = "";
    displayHabits();
}

// 5️⃣ Save Data
function saveHabits() {
    localStorage.setItem("habits", JSON.stringify(habits));
}

// 6️⃣ Display Habits
function displayHabits() {
    habitList.innerHTML = "";

    habits.forEach((habit, index) => {
        // Create card
        const card = document.createElement("div");
        card.className = "habit-card";

        // Habit name
        const title = document.createElement("h3");
        title.innerText = habit.name;

        // Streak display
        const streak = document.createElement("p");
        streak.className = "streak";
        streak.innerText = `🔥 Streak: ${habit.streak}`;

        // Mark Done button
        const button = document.createElement("button");
        button.innerText = "Mark as Done";

        // Add click event properly
        button.addEventListener("click", () => completeHabit(index, streak));

        // Append elements
        card.appendChild(title);
        card.appendChild(streak);
        card.appendChild(button);
        habitList.appendChild(card);
    });
}

// 7️⃣ Complete Habit Function (Updated)
function completeHabit(index, streakElement) {
    const today = new Date().toISOString().split("T")[0];
    const habit = habits[index];

    if (habit.lastCompleted) {
        const lastDate = new Date(habit.lastCompleted);
        const currentDate = new Date(today);
        const diffTime = currentDate - lastDate;
        const diffDays = diffTime / (1000 * 3600 * 24);

        if (diffDays === 1) {
            habit.streak++;
        } else if (diffDays > 1) {
            habit.streak = 1;
        }
    } else {
        habit.streak = 1;
    }

    habit.lastCompleted = today;

    saveHabits();
    displayHabits(); // Re-render

    showTip(habit.streak);

    // Animate streak (safe)
    streakElement.classList.add("animate");
    setTimeout(() => {
        streakElement.classList.remove("animate");
    }, 500);
}

// 8️⃣ Show Psychology Tips
function showTip(streak) {
    if (streak === 1) {
        tips.innerText = "Great start! Consistency beats motivation.";
    } else if (streak === 3) {
        tips.innerText = "Habit forming stage! Don’t break the chain.";
    } else if (streak >= 7) {
        tips.innerText = "Amazing! You are building discipline.";
    } else {
        tips.innerText = "Keep going! Small progress matters.";
    }
}

// 9️⃣ Initial Load
displayHabits();
