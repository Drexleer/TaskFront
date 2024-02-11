import {
  NotificationCard,
  NotificationHeading,
  NotificationPara,
  ButtonContainer,
  NotNowBtn,
  DivContainer,
} from './StyledNotification';

export default function Notification(props) {
  return (
    <DivContainer>
      <NotificationCard>
        <NotificationHeading>Push notifications</NotificationHeading>
        <img
          src="https://uxwing.com/wp-content/themes/uxwing/download/checkmark-cross/done-icon.png"
          alt="task"
          style={{ width: '40%' }}
        />
        <NotificationPara>Task create Sucefully</NotificationPara>
        <ButtonContainer>
          <NotNowBtn onClick={props.markAsRead}>Mark as Read</NotNowBtn>
        </ButtonContainer>
      </NotificationCard>
    </DivContainer>
  );
}
