const Notification = ({ status, title, message }) => {
  let specialClasses = "";

  if (status === "error") {
    specialClasses = "error";
  }
  if (status === "success") {
    specialClasses = "success";
  }

  const cssClasses = `notification ${specialClasses}`;

  return (
    <section className={cssClasses}>
      <h2>{title}</h2>
      <p>{message}</p>
    </section>
  );
};
export default Notification;
