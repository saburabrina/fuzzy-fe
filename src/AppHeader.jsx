import { ButtonGroup, Button } from '@progress/kendo-react-buttons';
import { AppBar, AppBarSection, AppBarSpacer } from '@progress/kendo-react-layout';

import { useLogout } from './state/mutations';
import { useNavigate } from 'react-router-dom';

const AppHeader = () => {
  const onSuccess = () => {
    navigate('/login');
  };

  const navigate = useNavigate();
  const { mutate: logout } = useLogout({ onSuccess });

  return (
    <AppBar>
      <AppBarSection>
        <ButtonGroup>
          <Button onClick={logout}>Logout</Button>
          <Button onClick={() => navigate('/create-user')}>Create User</Button>
        </ButtonGroup>
      </AppBarSection>
      <AppBarSpacer />
    </AppBar>
  );
};

export default AppHeader;
