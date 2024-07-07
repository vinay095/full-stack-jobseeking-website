import React from "react";
import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus } from "react-icons/fa";

const HSection = () => {
  const details = [
    {
      id: 1,
      title: "70,489",
      subTitle: "Live Job",
      icon: <FaSuitcase />,
    },
    {
      id: 2,
      title: "9120",
      subTitle: "Companies",
      icon: <FaBuilding />,
    },
    {
      id: 3,
      title: "12,34,200",
      subTitle: "Job Seekers",
      icon: <FaUsers />,
    },
    {
      id: 4,
      title: "03,761",
      subTitle: "Employers",
      icon: <FaUserPlus />,
    },
  ];
  return (
    <>
      <div className="hSection">
        <div className="container">
          <div className="title">
            <h1>Find a job that suits</h1>
            <h1>your interests and skills</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
              voluptate repellat modi quidem aliquid eaque ducimus ipsa et,
              facere mollitia!
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti 
              praesentium, reiciendis optio enim nostrum velit, debitis veniam 
              officiis obcaecati quidem nulla a nobis? Temporibus cupiditate 
              voluptates culpa aliquam vitae nostrum?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum
               omnis numquam veritatis reprehenderit, optio exercitationem fugit adipis
               ci a dicta, amet ducimus nesciunt debitis labore aut? Nobis laborum temporibus itaque sint!
            </p>
          </div>
          <div className="image">
            <img src="/S.jpg" alt="" />
          </div>
        </div>
        <div className="details">
          {details.map((element) => {
            return (
              <div className="card" key={element.id}>
                <div className="icon">{element.icon}</div>
                <div className="content">
                  <p>{element.title}</p>
                  <p>{element.subTitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default HSection;
