import Card from "../../../shared/components/UIElements/Card/Card";
import LanguageSelector from "../../../shared/components/LanguageSelector/LanguageSelector";
import "./AuthPanel.css";

const AuthPanel = props => {
  return (
    <div className="auth-panel">
      <LanguageSelector className="language-selector-float" />
      <Card className="container">{props.children}</Card>
    </div>
  );
};

AuthPanel.Header = function AuthPanelHeader(props) {
  return (
    <div className="auth-panel__header">
      <h3>Catalog Project</h3>
    </div>
  );
};

AuthPanel.Content = function AuthPanelContent(props) {
  return <div className="auth-panel__content">{props.children}</div>;
};

AuthPanel.Footer = function AuthPanelFooter(props) {
  return <div className="auth-panel__footer">{props.children}</div>;
};

export default AuthPanel;
