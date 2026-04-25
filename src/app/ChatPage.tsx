import LiveRoomChatWithStreamMultipleVideoParticipantsWithRocketchats from "../imports/LiveRoomChatWithStreamMultipleVideoParticipantsWithRocketchats/LiveRoomChatWithStreamMultipleVideoParticipantsWithRocketchats";
import { RocketChatButton } from "./components/RocketChatButton";

export default function ChatPage() {
  return (
    <div className="size-full relative">
      <LiveRoomChatWithStreamMultipleVideoParticipantsWithRocketchats />
      <RocketChatButton variant="small" className="absolute right-4 bottom-24 z-50" />
    </div>
  );
}
