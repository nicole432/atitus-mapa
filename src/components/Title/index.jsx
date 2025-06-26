import "./title.css";

export const Title = ({title, welcome}) => {
  return (
    <div className="container">
      <div className="welcome">{welcome}</div>
      <div  className="title">{title}</div>
    </div>
  );
};
