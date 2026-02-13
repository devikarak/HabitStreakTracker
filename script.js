const addBtn = document.getElementById("addBtn");
const habitInput = document.getElementById("habitInput");
const habitList = document.getElementById("habitList");
const tips = document.getElementById("tips");

let habits = JSON.parse(localStorage.getItem("habits")) || [];
addBtn.addEventListener("click", addHabit);
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
function saveHabits() {
    localStorage.setItem("habits", JSON.stringify(habits));
}
function displayHabits() {
    habitList.innerHTML = "";

    habits.forEach((habit, index) => {
        habitList.innerHTML += `
            <div class="habit-card">
                <h3>${habit.name}</h3>
                <p class="streak">🔥 Streak: ${habit.streak}</p>
                <button onclick="completeHabit(${index})">Mark as Done</button>
            </div>
        `;
    });
}
function completeHabit(index) {
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
    displayHabits();
    showTip(habit.streak);
}
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
displayHabits();
