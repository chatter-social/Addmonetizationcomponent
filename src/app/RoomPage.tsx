import LiveRoomParticipantStaticWithStreamOnTap from "../imports/LiveRoomParticipantStaticWithStreamOnTap/LiveRoomParticipantStaticWithStreamOnTap";
import { RocketChatButton } from "./components/RocketChatButton";

export default function RoomPage() {
  return (
    <div className="size-full relative">
      <LiveRoomParticipantStaticWithStreamOnTap />
      <RocketChatButton />
    </div>
  );
}
