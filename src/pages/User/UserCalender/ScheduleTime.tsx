const ScheduleTime: React.FC<{
  year: string;
  month: string;
  day: string;
}> = (props) => {
  return (
    <div>
      <p>
        {props.year} / {props.month} / {props.day}
      </p>
    </div>
  );
};

export default ScheduleTime;
