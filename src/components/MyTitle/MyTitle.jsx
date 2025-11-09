const MyTitle = ({ children, className = "" }) => {
  return (
    <>
      <h3
        className={`${className} text-2xl text-neutral font-bold text-center`}
      >
        {children}
      </h3>
    </>
  );
};

export default MyTitle;
