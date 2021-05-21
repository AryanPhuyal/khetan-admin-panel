import { Card, CardBody } from "reactstrap";
import Alert from "../../shared/Alert/Alert";
const AlertTemplate = ({ options, message }) => (
  <Card>
    <CardBody>
      {options.type === "info" && (
        <Alert color="info">
          <p>
            <span className="bold-text">Information:</span> {message}
          </p>
        </Alert>
      )}
      {options.type === "success" && (
        <Alert color="success">
          <p>
            <span className="bold-text">Congratulations!</span> {message}
          </p>
        </Alert>
      )}
      {options.type === "warning" && (
        <Alert color="warning">
          <p>
            <span className="bold-text">Attention!</span>
            {message}
          </p>
        </Alert>
      )}
      {options.type === "danger" && (
        <Alert color="danger">
          <p>
            <span className="bold-text">Warning!</span>
            {message}
          </p>
        </Alert>
      )}
    </CardBody>
  </Card>
);

export default AlertTemplate;
