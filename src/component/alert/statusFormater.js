const StatusFormatter = (value) =>
  value === 0 ? (
    <span className="badge badge-secondary">Pending</span>
  ) : value === 1 ? (
    <span className="badge badge-secondary">Pending</span>
  ) : value === 2 ? (
    <span className="badge badge-success">Approved</span>
  ) : (
    <span className="badge badge-warning">Suspended</span>
  );
export default StatusFormatter;
