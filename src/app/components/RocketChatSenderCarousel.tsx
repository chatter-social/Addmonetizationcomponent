import { StreakAvatar } from "./StreakAvatar";

interface RocketChatSender {
  id: string;
  imageUrl: string;
  username: string;
  streak: number;
}

// Mock data - replace with real data from your app
const mockSenders: RocketChatSender[] = [
  { id: "1", imageUrl: "/src/imports/LiveRoomChatWithStreamMultipleVideoParticipantsWithRocketchats/fac99a9e7aa44294144b06ba63eff944640788b5.png", username: "yasmine", streak: 23 },
  { id: "2", imageUrl: "/src/imports/LiveRoomChatWithStreamMultipleVideoParticipantsWithRocketchats/5d08e8fa0db87fdddd7dcd82dacd82e2ec4743b2.png", username: "alex", streak: 15 },
  { id: "3", imageUrl: "/src/imports/LiveRoomChatWithStreamMultipleVideoParticipantsWithRocketchats/fac99a9e7aa44294144b06ba63eff944640788b5.png", username: "jordan", streak: 8 },
  { id: "4", imageUrl: "/src/imports/LiveRoomChatWithStreamMultipleVideoParticipantsWithRocketchats/5d08e8fa0db87fdddd7dcd82dacd82e2ec4743b2.png", username: "taylor", streak: 3 },
  { id: "5", imageUrl: "/src/imports/LiveRoomChatWithStreamMultipleVideoParticipantsWithRocketchats/fac99a9e7aa44294144b06ba63eff944640788b5.png", username: "casey", streak: 1 },
];

export function RocketChatSenderCarousel() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="content-stretch flex flex-col items-start px-[16px] relative size-full">
        <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
          <div className="content-stretch flex items-center justify-center overflow-clip relative shrink-0">
            <div className="overflow-clip relative shrink-0 size-[18px]">
              <div className="absolute inset-[30.62%_30.56%_58.95%_59.02%]">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.87664 1.87664">
                  <path d="M1.87642 0.938201C1.87642 0.709982 1.69244 0.526001 1.46422 0.526001C1.236 0.526001 1.05202 0.709982 1.05202 0.938201C1.05202 1.16642 1.236 1.3504 1.46422 1.3504C1.69244 1.3504 1.87642 1.16642 1.87642 0.938201Z" fill="#F5F1E9" stroke="#F5F1E9" strokeWidth="0.0351562" />
                </svg>
              </div>
              <div className="absolute inset-[6.25%]">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.7494 15.7499">
                  <path d="M15.7494 5.78104C15.7494 5.49729 15.7494 5.35479 15.6994 5.23854C15.6556 5.13729 15.5806 5.05354 15.4869 5.00041C15.3794 4.93916 15.2369 4.93166 14.9519 4.91666C13.9106 4.86541 12.9619 4.40416 12.2744 3.71604C11.5863 3.02854 11.125 2.07979 11.0738 1.03854C11.0588 0.753537 11.0513 0.611037 10.99 0.503537C10.9369 0.409787 10.8531 0.334787 10.7519 0.291037C10.6356 0.240662 10.4931 0.240662 10.2094 0.240662C9.04627 0.240662 7.93439 0.702162 7.11627 1.52029C6.29815 2.33904 5.83627 3.45029 5.83627 4.61416C5.83627 5.52654 6.27377 6.36291 6.97065 6.93354L5.90127 8.00354C5.2744 7.76666 4.63065 7.64729 3.98752 7.64729C1.78377 7.64729 0.000148773 9.43104 0.000148773 11.6348C0.000148773 13.8385 1.78377 15.6223 3.98752 15.6223C6.1919 15.6223 7.9744 13.8385 7.9744 11.6348C7.9744 10.991 7.85565 10.3473 7.61877 9.72104L8.68877 8.65104C9.25877 9.34729 10.0956 9.78479 11.0081 9.78479C12.1719 9.78479 13.2831 9.32229 14.1013 8.50479C14.9194 7.68666 15.3813 6.57541 15.3813 5.41166C15.3806 5.21541 15.3738 5.11416 15.3588 4.99854C15.3438 4.88354 15.3563 4.82541 15.3813 4.71854C15.4063 4.61229 15.4594 4.51979 15.5656 4.33604C15.7694 3.96729 15.7494 5.78104 15.7494 5.78104ZM3.98752 13.7473C2.81815 13.7473 1.87565 12.8048 1.87565 11.6348C1.87565 10.4648 2.81815 9.52229 3.98752 9.52229C4.52377 9.52229 5.03065 9.72104 5.41127 10.1004L4.07252 11.4385C3.96127 11.5498 3.89815 11.6998 3.89815 11.8573C3.89815 12.0148 3.96127 12.1648 4.07252 12.276C4.18502 12.3873 4.33502 12.4504 4.49252 12.4504C4.65002 12.4504 4.80002 12.3873 4.91127 12.276L6.25002 10.9379C6.62877 11.3185 6.82752 11.8254 6.82752 12.3623C6.8244 13.5048 5.90627 14.4473 4.73627 14.4473C4.48502 14.4473 4.23502 14.4473 3.98502 14.4473C3.73502 14.4473 3.9869 13.7473 3.9869 13.7473L3.98752 13.7473Z" fill="#F5F1E9" />
                </svg>
              </div>
              <div className="absolute inset-[65.62%_65.63%_9.38%_9.37%]">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.49941 4.50068">
                  <path d="M4.49923 2.25041C4.49923 1.01166 3.48861 0.00166321 2.24986 0.00166321C1.01111 0.00166321 0.000488281 1.01228 0.000488281 2.25041C0.000488281 3.48916 1.01111 4.49916 2.24986 4.49916C3.48861 4.49916 4.49923 3.48916 4.49923 2.25041Z" fill="#F5F1E9" />
                </svg>
              </div>
            </div>
          </div>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide">
            {mockSenders
              .sort((a, b) => b.streak - a.streak) // Sort by highest streak first
              .map((sender) => (
                <StreakAvatar
                  key={sender.id}
                  imageUrl={sender.imageUrl}
                  username={sender.username}
                  streak={sender.streak}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
