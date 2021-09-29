import React from "react";

export const TaskList = () => {
	const [task, setTask] = React.useState("");
	const [list, setList] = React.useState([]);
	const handleInput = e => {
		if (e.keyCode == 13) {
			setTask(e.target.value);
			setList([...list, task]);
			setTask("");
		}
	};
	const deleteToDo = indexToRemove => {
		let filterList = list.filter((taskToRemove, i) => i != indexToRemove);
		setList(filterList);
	};

	return (
		<div className="page">
			<div className="note">
				<div className="title">
					<input
						className="inputnote"
						type="text"
						placeholder="What needs to be done?"
						value={task}
						onChange={event => setTask(event.target.value)}
						onKeyDown={e => handleInput(e)}
					/>
				</div>
				<div>
					<ul>
						{list.map((singleTask, i) => {
							return (
								<li key={i}>
									{singleTask}
									<span onClick={() => deleteToDo(i)}>
										<strong> x</strong>
									</span>
								</li>
							);
						})}
					</ul>
				</div>
			</div>
		</div>
	);
};
