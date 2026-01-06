import { useParams } from "react-router-dom";
import ChatRoom from "../components/chats/ChatRoom";
import InviteReferee from "../components/Invite/InviteReferee";

export default function VerificationRoom() {
  const { id } = useParams();
  return (
    <div className="h-screen grid grid-cols-3 gap-4 p-4">
      <div className="col-span-2">
        <ChatRoom roomId={id} role="HR" />
      </div>
      <InviteReferee roomId={id} />
    </div>
  );
}
