import Alert from "react-bootstrap/Alert"

type ErrorMessageProps = {
  error: Error
}

const ErrorMessage: React.FC<ErrorMessageProps> = (props) => {
  const { error } = props
  return <Alert variant="danger">{error.message}</Alert>
}

export default ErrorMessage
