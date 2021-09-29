import React from "react";

import { TaskList } from "./TaskList.jsx";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	return (
		<div className="">
			<TaskList />
		</div>
	);
};

export default Home;
