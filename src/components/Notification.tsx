type NotificationType = {
  children?: string | JSX.Element | JSX.Element[];
  type?: 'error' | 'success' | 'warning';
}

const Notification = ({children, type = 'success'}: NotificationType) => {
  let color = 'teal lighten-2';
  if (type === 'error') {
    color = 'red lighten-2';
  } else if (type === 'warning') {
    color = 'orange lighten-2';
  }
  return (
    <div className={`card-panel lighten-2 ${color}`}>{children}</div>
  );
}

export default Notification;
