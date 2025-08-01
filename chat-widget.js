(function() {
    // Create and inject styles (updated with audio player and recording feedback)
    const styles = `
    .n8n-chat-widget {
        --chat--color-primary: var(--n8n-chat-primary-color, #854fff);
        --chat--color-secondary: var(--n8n-chat-secondary-color, #6b3fd4);
        --chat--color-background: var(--n8n-chat-background-color, #ffffff);
        --chat--color-font: var(--n8n-chat-font-color, #333333);
        font-family: 'Geist Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }


    .n8n-chat-widget .chat-container {
        position: fixed;
        bottom: 0px;
        right: 0px;
        z-index: 1000;
        display: none;
        width: 100%;
        height: 100%;
        background: var(--chat--color-background);
        border-radius: 20px;
        box-shadow: 0 8px 32px rgba(133, 79, 255, 0.15);
        border: 1px solid rgba(133, 79, 255, 0.2);
        overflow: hidden;
        font-family: inherit;
        resize: none;
        transition: none;
    }

    .n8n-chat-widget .chat-container.position-left {
        right: 0px;
    }

    .n8n-chat-widget .chat-container.open {
        bottom: 0px;
        right: 0px;
        display: flex;
        flex-direction: column;
    }

    .n8n-chat-widget .chat-container.position-left.open {
        right: auto;
    }

    .n8n-chat-widget .chat-container.open:not(.position-left) {
        right: 0px;
    }



    .n8n-chat-widget .chat-container,
    .n8n-chat-widget .chat-container.open {
        bottom: 0px;
        right: 0px;
        border-color:rgb(50, 0, 107)  #5c006b  rgb(8, 49, 130)  rgb(8, 49, 130);
        border-right-width: thick;
        border-left-width: thick;
        border-bottom-width: thick;
    }


    .n8n-chat-widget .brand-header {
        padding: 7px;
        display: flex;
        align-items: center;
        gap: 12px;
        background-image: linear-gradient(to right, rgb(8, 49, 130), #5c006b);
        animation: BackgroundGradient 15s ease infinite;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        position: relative;
    }




    .n8n-chat-widget .fullscreen-button {
        position: absolute;
        right: 76px; /* Adjusted to place it to the left of the refresh button (48px + 28px) */
        top: 50%;
        transform: translateY(-50%);
        background: none;
        border: none;
        color: #ffffff !important;
        cursor: pointer;
        padding: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: opacity 0.2s;
        border-radius: 50%;
        width: 29px;
        height: 29px;
    }

    .n8n-chat-widget .fullscreen-button:hover {
        opacity: 1;
        background-color: #333333;
    }

    .n8n-chat-widget .fullscreen-button svg {
        fill: currentColor;
        width: 16px;
        height: 16px;
    }
    .n8n-chat-widget   {
        fill: currentColor;
        width: 20px;
        height: 20px;
    }


    .n8n-chat-widget .refresh-button {
        position: absolute;
        right: 40px;
        top: 50%;
        transform: translateY(-50%);
        background: none;
        border: none;
        color: #ffffff !important;
        cursor: pointer;
        padding: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: opacity 0.2s;
        border-radius: 50%;
        width: 40px;
        height: 40px;
    }

    .n8n-chat-widget .refresh-button:hover {
        opacity: 1;
        background-color: #333333;
    }

    .n8n-chat-widget .refresh-button svg {
        fill: currentColor;
        width: 20px;
        height: 20px;
    }

    .n8n-chat-widget .close-button {
        position: absolute;
        right: 16px;
        top: 50%;
        transform: translateY(-50%);
        background: none;
        border: none;
        cursor: pointer;
        padding: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: color 0.2s;
        color: #ffffff;
        font-size: 23px;
        border-radius: 50%;
        width: 28px;
        height: 28px;
    }

    .n8n-chat-widget .close-button:hover {
        background-color: #333333;
        opacity: 1;
    }

    .n8n-chat-widget .brand-header img {
        width: 32px;
        height: 32px;
        border-radius: 50%;
    }
    
    .n8n-chat-widget .bot-avatar {
        background-image: url("data:image/svg+xml,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' width='54' height='56'%3E%3Cpath d='M0 0 C0 1.32 0 2.64 0 4 C-0.66 4 -1.32 4 -2 4 C-2 4.99 -2 5.98 -2 7 C-1.26394531 7.09796875 -0.52789063 7.1959375 0.23046875 7.296875 C10.33390242 8.84508941 10.33390242 8.84508941 14 13 C14.8125 15.25 14.8125 15.25 15 17 C16.32 17.33 17.64 17.66 19 18 C19 21.63 19 25.26 19 29 C18.01 29.33 17.02 29.66 16 30 C14.79117904 32.00016466 14.79117904 32.00016466 14 34 C13.34 34 12.68 34 12 34 C12 34.66 12 35.32 12 36 C9.73192796 37.0067004 7.46092246 38.00551766 5.1875 39 C4.54490234 39.28617188 3.90230469 39.57234375 3.24023438 39.8671875 C0.32243531 41.13711041 -1.78265714 42 -5 42 C-5 40.68 -5 39.36 -5 38 C-5.75925781 37.95101562 -6.51851562 37.90203125 -7.30078125 37.8515625 C-8.29464844 37.77679688 -9.28851562 37.70203125 -10.3125 37.625 C-11.29863281 37.55539063 -12.28476562 37.48578125 -13.30078125 37.4140625 C-16 37 -16 37 -19 35 C-19 34.34 -19 33.68 -19 33 C-19.66 33 -20.32 33 -21 33 C-21 32.01 -21 31.02 -21 30 C-21.639375 29.87625 -22.27875 29.7525 -22.9375 29.625 C-23.9584375 29.315625 -23.9584375 29.315625 -25 29 C-26.20272819 26.59454362 -26.10071472 25.05003047 -26.0625 22.375 C-26.05347656 21.55773437 -26.04445313 20.74046875 -26.03515625 19.8984375 C-26.02355469 19.27195312 -26.01195312 18.64546875 -26 18 C-25.03900391 17.82597656 -25.03900391 17.82597656 -24.05859375 17.6484375 C-23.37925781 17.43445313 -22.69992188 17.22046875 -22 17 C-21.690625 16.21625 -21.38125 15.4325 -21.0625 14.625 C-19.62590758 11.07577167 -18.52451269 10.51050544 -15 9 C-11.35427854 8.17842897 -7.69568037 7.55014506 -4 7 C-4 6.01 -4 5.02 -4 4 C-4.66 4 -5.32 4 -6 4 C-6 2.68 -6 1.36 -6 0 C-3.50907189 -1.24546405 -2.58919267 -0.7767578 0 0 Z ' fill='%23CACDD0' transform='translate(31,7)'/%3E%3Cpath d='M0 0 C1.58748047 -0.0299707 1.58748047 -0.0299707 3.20703125 -0.06054688 C4.72876953 -0.05958008 4.72876953 -0.05958008 6.28125 -0.05859375 C7.6744043 -0.06137329 7.6744043 -0.06137329 9.09570312 -0.06420898 C11.5 0.4375 11.5 0.4375 13.3034668 2.30029297 C14.82430072 5.01675494 14.86729985 6.90170081 14.8125 10 C14.80863281 10.95003906 14.80476563 11.90007813 14.80078125 12.87890625 C14.5 15.4375 14.5 15.4375 12.5 18.4375 C8.4951979 19.880311 4.26936741 19.62140746 0.0625 19.625 C-0.68837891 19.63724609 -1.43925781 19.64949219 -2.21289062 19.66210938 C-6.39120456 19.67313395 -9.74381715 19.50014376 -13.5 17.4375 C-14.85281371 14.73187257 -14.70609362 12.51856345 -14.75 9.5 C-14.77578125 8.43910156 -14.8015625 7.37820312 -14.828125 6.28515625 C-14.5 3.4375 -14.5 3.4375 -13.30566406 1.78662109 C-9.60321762 -0.97970111 -4.44163789 -0.02975519 0 0 Z ' fill='%23071942' transform='translate(27.5,20.5625)'/%3E%3Cpath d='M0 0 C1.60294922 0.04060547 1.60294922 0.04060547 3.23828125 0.08203125 C4.04652344 0.11683594 4.85476562 0.15164063 5.6875 0.1875 C5.6875 1.5075 5.6875 2.8275 5.6875 4.1875 C4.84445313 4.30867188 4.00140625 4.42984375 3.1328125 4.5546875 C2.03710938 4.72226562 0.94140625 4.88984375 -0.1875 5.0625 C-1.82332031 5.30613281 -1.82332031 5.30613281 -3.4921875 5.5546875 C-6.43182714 5.95006513 -6.43182714 5.95006513 -8.3125 8.1875 C-8.55627883 11.54494112 -8.55627883 11.54494112 -8.4375 15.3125 C-8.39625 17.58125 -8.355 19.85 -8.3125 22.1875 C-3.6925 22.8475 0.9275 23.5075 5.6875 24.1875 C5.6875 25.5075 5.6875 26.8275 5.6875 28.1875 C0.02975575 29.36619672 -3.81360636 29.08367022 -9.3125 27.1875 C-9.6425 26.1975 -9.9725 25.2075 -10.3125 24.1875 C-10.9725 24.1875 -11.6325 24.1875 -12.3125 24.1875 C-12.3125 23.1975 -12.3125 22.2075 -12.3125 21.1875 C-12.951875 21.06375 -13.59125 20.94 -14.25 20.8125 C-15.2709375 20.503125 -15.2709375 20.503125 -16.3125 20.1875 C-17.51522819 17.78204362 -17.41321472 16.23753047 -17.375 13.5625 C-17.36597656 12.74523438 -17.35695313 11.92796875 -17.34765625 11.0859375 C-17.33605469 10.45945312 -17.32445312 9.83296875 -17.3125 9.1875 C-16.67183594 9.07148438 -16.03117187 8.95546875 -15.37109375 8.8359375 C-14.69175781 8.62195312 -14.01242188 8.40796875 -13.3125 8.1875 C-13.003125 7.40375 -12.69375 6.62 -12.375 5.8125 C-10.12962936 0.26511373 -5.4692016 -0.18030335 0 0 Z ' fill='%23E1E3E5' transform='translate(22.3125,15.8125)'/%3E%3Cpath d='M0 0 C0 2.31 0 4.62 0 7 C0.66 7 1.32 7 2 7 C2 4.69 2 2.38 2 0 C2.99 0.33 3.98 0.66 5 1 C5.3125 3.6875 5.3125 3.6875 5 7 C2.6875 9.875 2.6875 9.875 0 12 C-0.99 12 -1.98 12 -3 12 C-4.52491998 8.95016004 -4.23562548 6.3576631 -4 3 C-1.77419355 0 -1.77419355 0 0 0 Z ' fill='%23122B5D' transform='translate(17,26)'/%3E%3Cpath d='M0 0 C0 1.32 0 2.64 0 4 C-0.66 4 -1.32 4 -2 4 C-2 4.99 -2 5.98 -2 7 C-1.01 7.33 -0.02 7.66 1 8 C1 8.33 1 8.66 1 9 C-1.97 9 -4.94 9 -8 9 C-6.68 8.34 -5.36 7.68 -4 7 C-4 6.01 -4 5.02 -4 4 C-4.66 4 -5.32 4 -6 4 C-6 2.68 -6 1.36 -6 0 C-3.50907189 -1.24546405 -2.58919267 -0.7767578 0 0 Z ' fill='%232881C5' transform='translate(31,7)'/%3E%3Cpath d='M0 0 C0.99 0 1.98 0 3 0 C3 4.29 3 8.58 3 13 C2.01 12.67 1.02 12.34 0 12 C-1.1898306 9.6203388 -1.13349966 8.08514265 -1.125 5.4375 C-1.12886719 4.22900391 -1.12886719 4.22900391 -1.1328125 2.99609375 C-1 1 -1 1 0 0 Z ' fill='%2332B6EF' transform='translate(6,24)'/%3E%3Cpath d='M0 0 C3.53571429 0.53571429 3.53571429 0.53571429 5 2 C5.04092937 4.33297433 5.04241723 6.66705225 5 9 C4.34 9 3.68 9 3 9 C2.67 7.02 2.34 5.04 2 3 C1.67 3 1.34 3 1 3 C0.67 4.98 0.34 6.96 0 9 C-0.66 9 -1.32 9 -2 9 C-2.125 5.625 -2.125 5.625 -2 2 C-1.34 1.34 -0.68 0.68 0 0 Z ' fill='%2335BAF7' transform='translate(34,24)'/%3E%3Cpath d='M0 0 C2.475 0.99 2.475 0.99 5 2 C5 4.31 5 6.62 5 9 C4.34 9 3.68 9 3 9 C2.87625 8.030625 2.7525 7.06125 2.625 6.0625 C2.315625 4.5465625 2.315625 4.5465625 2 3 C1.34 2.67 0.68 2.34 0 2 C0 4.31 0 6.62 0 9 C-0.66 9 -1.32 9 -2 9 C-2.125 5.625 -2.125 5.625 -2 2 C-1.34 1.34 -0.68 0.68 0 0 Z ' fill='%2335BBF8' transform='translate(19,24)'/%3E%3Cpath d='M0 0 C1.32 0.33 2.64 0.66 4 1 C4 4.63 4 8.26 4 12 C3.01 12 2.02 12 1 12 C0.67 8.04 0.34 4.08 0 0 Z ' fill='%232F7ADD' transform='translate(46,24)'/%3E%3Cpath d='M0 0 C-2.07143201 4.03384128 -3.96615872 5.92856799 -8 8 C-8.36075949 3.55063291 -8.36075949 3.55063291 -6.8125 1.1875 C-4.44017475 -0.36678206 -2.77958655 -0.22537188 0 0 Z ' fill='%23152E62' transform='translate(21,21)'/%3E%3Cpath d='M0 0 C0 2.64 0 5.28 0 8 C-1.98 8.99 -1.98 8.99 -4 10 C-4.36814024 3.49618902 -4.36814024 3.49618902 -2.5625 1.0625 C-1 0 -1 0 0 0 Z ' fill='%2306163E' transform='translate(17,26)'/%3E%3Cpath d='M0 0 C1.9453125 -0.29296875 1.9453125 -0.29296875 4.125 -0.1875 C5.40375 -0.125625 6.6825 -0.06375 8 0 C6.68 1.65 5.36 3.3 4 5 C2.02 4.34 0.04 3.68 -2 3 C-1.34 2.01 -0.68 1.02 0 0 Z ' fill='%23071B44' transform='translate(21,21)'/%3E%3Cpath d='M0 0 C1.32 0.33 2.64 0.66 4 1 C1.36 3.64 -1.28 6.28 -4 9 C-4.33 7.68 -4.66 6.36 -5 5 C-2.8125 2.1875 -2.8125 2.1875 0 0 Z ' fill='%23152E63' transform='translate(29,21)'/%3E%3Cpath d='M0 0 C1.98 0 3.96 0 6 0 C5.6875 1.9375 5.6875 1.9375 5 4 C4.01 4.33 3.02 4.66 2 5 C1.01 4.01 0.02 3.02 -1 2 C-0.67 1.34 -0.34 0.68 0 0 Z ' fill='%2330A9E4' transform='translate(25,32)'/%3E%3Cpath d='M0 0 C-6.625 3 -6.625 3 -10 3 C-10 2.01 -10 1.02 -10 0 C-3.375 -1.125 -3.375 -1.125 0 0 Z ' fill='%23D4D6D7' transform='translate(36,46)'/%3E%3C/svg%3E");
    }

    .n8n-chat-widget .bot-message-container {
        margin-top: 20px;
        display: table-column;
        position: relative;
        margin-bottom: 10px;
        background: var(--chat--color-background);
    }



    .n8n-chat-widget .message-footer {
        margin-left: 40px;
        margin-top: 4px;
        display: flex;
        gap: 12px;
        justify-content: flex-start;
        opacity: 0;
        transition: opacity 0.2s;
        background: none;
        margin: 5px 10px 0;
    }

    .n8n-chat-widget .bot-message-container:hover .message-footer {
        opacity: 1;
    }

    .n8n-chat-widget .message-footer button {
        background: none;
        border: none;
        cursor: pointer;
        padding: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        border-radius: 50%;
        transition: transform 0.1s ease, box-shadow 0.1s ease;
        color: #666;
    }

    .n8n-chat-widget .message-footer button:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    }

    .n8n-chat-widget .message-footer button svg {
        width: 15px;
        height: 15px;
        fill: #666;
    }

    .n8n-chat-widget .brand-header span {
        font-size: 18px;
        font-weight: 500;
        color: #ffffff;
    }

    .n8n-chat-widget .chat-interface {
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    .n8n-chat-widget .chat-messages {
        flex: 1;
        overflow-y: auto;
        padding: 1px 20px 20px 20px;
        background: var(--chat--color-background);
        display: flex;
        flex-direction: column;
        gap: 15px;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
    }

    ::-webkit-scrollbar {
        width: 5px;
    }

    ::-webkit-scrollbar-track {
        background: transparent;
    }

    ::-webkit-scrollbar-thumb {
        -webkit-border-radius: 10px;
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5);
    }

    .n8n-chat-widget .chat-message {
        display: flex;
        align-items: flex-start;
        gap: 8px;
        margin: 8px 0;
    }

    .n8n-chat-widget .chat-message.user {
        flex-direction: row-reverse;
        align-self: flex-end;
        gap: 0;
    }

    .n8n-chat-widget .chat-message.bot {
        flex-direction: column;
        align-self: flex-start;
    }

    .n8n-chat-widget .avatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background-size: cover;
        background-position: center;
        flex-shrink: 0;
    }

    .n8n-chat-widget .message-bubble {        
        display: flex;
        align-items: flex-start;
        gap: 10px;
        padding: 10px;
        background: #f1f1f1;
        border-radius: 8px;
    }

    .n8n-chat-widget .chat-message.user{
        max-width: 100%;
    }

    .n8n-chat-widget .chat-message.user .message-bubble-user {
        white-space: pre-wrap;
        padding: 8px 12px;
        background: linear-gradient(to right,rgb(9, 90, 160),rgb(63, 11, 137));
        color: rgb(255, 255, 255);
        border-radius: 12px 0px 12px 12px; 
        max-height: 100%;
        word-wrap: break-word;
        font-size: 14px;
        line-height: 1.4;
        margin: 20px 0;
        min-width: 40px;
        // display: inline-block;
    }

    .n8n-chat-widget .message-bubble ul {
        list-style-type: disc;
        padding-left: 20px;
        margin: 5px 0;
    }

    .n8n-chat-widget .message-bubble li {
        margin-bottom: 5px;
        font-size: 14px;
        line-height: 1.5;
        color: var(--chat--color-font);
    }

    .n8n-chat-widget .message-bubble div {
        margin-bottom: 5px;
        font-size: 14px;
        line-height: 1.5;
        color: var(--chat--color-font);
    }

    .n8n-chat-widget .chat-message.user .message-bubble {
        white-space: pre-wrap;
        padding: 8px 12px;
        border-radius: 12px 12px 0 12px;
    }

    .n8n-chat-widget .chat-message.bot .message-bubble {
        padding: 8px 12px;
        border-radius: 0px 12px 12px 12px;
        maxWidth = "80%";
        width = "100%";
    }

    .n8n-chat-widget .chat-message.bot .message-bubble-table {
        margin-top: -20px;
        padding: 8px 12px;
        border-radius: 0 0 12px 12px;
        maxWidth = "80%";
        width = "100%";
        display: flex;
        align-items: flex-start;
        gap: 10px;
        padding: 10px;
        background: #f1f1f1;
    }

    .n8n-chat-widget .chat-message.bot .message-bubble-dropdown {
        margin-top: -20px;
        padding: 10px 12px;
        border-radius: 0 0 12px 12px;
        maxWidth = "80%";
        width = "100%";
        display: flex;
        align-items: flex-start;
        gap: 10px;
        padding: 10px,20px,20px,20px;
        background: #f1f1f1;
    }

    .n8n-chat-widget .chat-message.bot .message-bubble-dropdown select {
        width: 100%;
        padding: 5px;
        border-radius: 4px;
        border: 1px solid #ddd;
        background:  #fff;
        font-size: 14px;
    }


    .n8n-chat-widget .chat-message.user .message-bubble::after,
    .n8n-chat-widget .chat-message.bot .message-bubble::before {
        content: none;
    }


    .n8n-chat-widget .chat-input {
        margin-bottom: -10px;
        padding: 5px 12px;
        border-top: 1px solid rgba(133, 79, 255, 0.2);
        position: relative;
        flex-shrink: 0; /* Prevent it from shrinking in full-screen */
    }
    .n8n-chat-widget .messages {
        flex: 1;
        overflow-y: auto;
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 12px;
        max-height: none; /* Allow it to grow in full-screen */
    }


    .n8n-chat-widget .input-row {
        display: flex;
        gap: 8px;
        width: 100%;
        align-items: center;
    }

    .n8n-chat-widget .textarea-wrapper {
        position: relative;
        flex: 1;
    }

    .n8n-chat-widget .chat-input textarea {

        flex: 1;
        height: 100%;
        padding: 12px 40px 12px 40px;
        border: 1px solid #000000;
        border-radius: 10px;
        background: var(--chat--color-background);
        color: var(--chat--color-font);
        resize: none;
        font-family: inherit;
        font-size: 14px;
        width: 100%;
        box-sizing: border-box;
        max-height: 120px;
        overflow-y: auto;
        min-height: 40px;
        height = 40px !important;
    }

    .n8n-chat-widget .chat-input textarea:focus {
        border: 1px solid #000000;
        outline: none;
    }

    .n8n-chat-widget .chat-input textarea::placeholder {
        color: var(--chat--color-font);
        opacity: 0.6;
    }

    .n8n-chat-widget .chat-input .send-button {
        background-color: #F3F4F6;
        border: none;
        padding: 0;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
    }

    .n8n-chat-widget .mic-button {
        background: none;
        border: none;
        padding: 0;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 48px;
        height: 48px;
        border-radius: 8px;
        position: absolute;
        right: 5px;
        top: 50%;
        transform: translateY(-50%);
    }

    .n8n-chat-widget .mic-button.recording {
        animation: pulse 1.5s infinite;
    }

    @keyframes pulse {
        0% { transform: translateY(-50%) scale(1); }
        50% { transform: translateY(-50%) scale(1.1); }
        100% { transform: translateY(-50%) scale(1); }
    }

    .n8n-chat-widget .chat-branding-message .chat-avatar-container{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        // margin: 20px 0 40px 0;
        text-align: center;
        flex-grow: 1;
    }

    .n8n-chat-widget .chat-branding-message img {
        width: 64px;
        height: 64px;
        margin-bottom: 8px;
        border-radius: 50%;
        background-color: #ffffff;
    }

    .n8n-chat-widget .chat-branding-message span {
        font-size: 18px;
        font-weight: 500;
        color: var(--chat--color-font);
    }

    .n8n-chat-widget .file-upload-button {
        background: #F3F4F6;
        border: none;
        padding: 0;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        font-size: 20px;
        color: white;
        position: absolute;
        left: 5px;
        top: 50%;
        transform: translateY(-50%);
        transition: background-color 0.2s ease, transform 0.2s ease;
    }

    .n8n-chat-widget .file-upload-button:hover {
        background-color: #D3D3D3;
        transform: translateY(-50%) scale(1.1);
    }

    .n8n-chat-widget .file-input {
        display: none;
    }

    .n8n-chat-widget .file-preview {
        display: flex;
        align-items: center;
        background: rgba(133, 79, 255, 0.1);
        padding: 8px 12px;
        border-radius: 8px;
        margin-bottom: 8px;
        font-size: 12px;
        max-width: 90%;
        box-sizing: border-box;
        overflow: hidden;
        word-break: break-all;
    }        

    .n8n-chat-widget .file-preview.audio {
        display: flex;
        flex-direction: column;
        gap: 4px;
        padding: 8px;
        background: rgba(133, 79, 255, 0.2);
    }

    .n8n-chat-widget .file-preview.audio audio {
        width: 100%;
        height: 40px;
    }

    .n8n-chat-widget .file-preview-name {
        flex: 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 100%;
        vertical-align: middle;
        word-break: break-all;
    }

    .n8n-chat-widget .file-preview-remove {
        background: none;
        border: none;
        cursor: pointer;
        color: var(--chat--color-font);
        opacity: 0.7;
        margin-left: 8px;
        padding: 2px 6px;
        border-radius: 4px;
    }

    .n8n-chat-widget .file-preview-remove:hover {
        background: rgba(133, 79, 255, 0.2);
        opacity: 1;
    }

    .n8n-chat-widget .chat-footer {
        padding: 4px;
        text-align: center;
        background: var(--chat--color-background);
    }

    .n8n-chat-widget .chat-footer a {
        color: var(--chat--color-primary);
        text-decoration: none;
        font-size: 12px;
        opacity: 0.8;
        transition: opacity 0.2s;
        font-family: inherit;
    }

    .n8n-chat-widget .chat-footer a:hover {
        opacity: 1;
    }

    .n8n-chat-widget .chat-toggle {
        position: fixed;
        bottom: 33px;
        right: 53px;
        width: auto;
        height: 50px;
        border-radius: 25px 25px 0px 25px;
        background: transparent linear-gradient(109deg, #103278 0%, #5C006B 100%) 0% 0% no-repeat padding-box;
        color: white;
        border: none;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(133, 79, 255, 0.3);
        z-index: 999;
        transition: transform 0.3s;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 20px;
        font-size: 14px;
        font-weight: 500;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        gap: 10px;
        min-width: 120px;
    }




.n8n-chat-widget .chat-toggle::before {
    content: "Ask AARYA";
    white-space: nowrap;
}


.n8n-chat-widget .chat-toggle.position-left {
    right: auto;
    left: 20px;
}

.n8n-chat-widget .chat-toggle:hover {
    transform: scale(1.05);
}

.n8n-chat-widget .chat-toggle svg {
    width: 20px;
    height: 20px;
    fill: currentColor;
    flex-shrink: 0;
}

    .n8n-chat-widget .confirmation-dialog {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #ffffff;
        border-radius: 8px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
        padding: 16px;
        z-index: 1001;
        width: 80%;
        max-width: 300px;
        text-align: center;
    }

    .n8n-chat-widget .confirmation-dialog h3 {
        margin: 0 0 12px;
        font-size: 16px;
        font-weight: 500;
        color: var(--chat--color-font);
    }

    .n8n-chat-widget .confirmation-dialog p {
        margin: 0 0 16px;
        font-size: 14px;
        color: var(--chat--color-font);
    }

    .n8n-chat-widget .confirmation-dialog .dialog-buttons {
        display: flex;
        justify-content: flex-end;
        gap: 8px;
    }

    .n8n-chat-widget .confirmation-dialog button {
        padding: 8px 16px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
        font-family: inherit;
    }

    .n8n-chat-widget .confirmation-dialog .cancel-button {
        background: #F3F4F6;
        color: var(--chat--color-font);
    }

    .n8n-chat-widget .confirmation-dialog .cancel-button:hover {
        background: #E5E7EB;
    }

    .n8n-chat-widget .confirmation-dialog .restart-button {
        background: #007BFF;
        color: white;
    }

    .n8n-chat-widget .confirmation-dialog .restart-button:hover {
        background: #0056b3;
    }

    .n8n-chat-widget .confirmation-dialog .dialog-close-button {
        position: absolute;
        top: 8px;
        right: 8px;
        background: none;
        border: none;
        font-size: 18px;
        cursor: pointer;
        color: var(--chat--color-font);
    }

    .n8n-chat-widget .dialog-backdrop {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.3);
        z-index: 1000;
        transition: opacity 0.2s ease;
    }

    .n8n-chat-widget .loading-indicator {
        display: flex;
        align-items: center;
        gap: 4px;
        margin: 8px 0;
        align-self: flex-start;
        padding: 12px 16px;
        background: #F3F4F6;
        border-radius: 12px 12px 12px 0;
        max-width: 80%;
    }

    .n8n-chat-widget .loading-indicator .dot {
        width: 8px;
        height: 8px;
        background: #666;
        border-radius: 100%;
        animation: bounce 1.2s infinite;
    }

    .n8n-chat-widget .loading-indicator .dot:nth-child(2) {
        animation-delay: 0.2s;
    }

    .n8n-chat-widget .loading-indicator .dot:nth-child(3) {
        animation-delay: 0.4s;
    }

    @keyframes bounce {
        0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
        }
        40% {
            transform: translateY(-8px);
        }
        60% {
            transform: translateY(-4px);
        }
    }

    .n8n-chat-widget .message-bubble img {
        max-width: 100%;
        height: auto;
        border-radius: 8px;
        margin-bottom: 5px;
    }

    .n8n-chat-widget .chat-message.user .message-bubble:has(img) {
        background: transparent;
        padding: 0;
    }

    .n8n-chat-widget .chat-message.user .message-bubble div {
        background: #007BFF;
        padding: 12px 16px;
        border-radius: 12px 12px 0 12px;
    }

    .n8n-chat-widget .message-bubble audio {
        width: 100%;
        height: 40px;
        background: rgb(249, 248, 237);
        border-radius: 8px;
        margin: 5px 0;
    }

    .n8n-chat-widget .chat-message.user .message-bubble audio {
        background: rgba(255, 255, 255, 0.2);
    }

    .n8n-chat-widget .file-message {
        display: flex;
        align-items: center;
        gap: 8px;
        background: #007BFF;
        color: #fff;
        border-radius: 16px;
        padding: 10px 18px;
        max-width: 60%;
        min-width: 100px;
        margin: 8px 0;
        box-sizing: border-box;
        overflow: hidden;
        word-break: break-all;
        display: inline-block;
    }

    .n8n-chat-widget .file-message .file-icon {
        width: 20px;
        height: 20px;
        fill: #fff;
        flex-shrink: 0;
    }

    .n8n-chat-widget .file-message span {
        display: inline-block;
        max-width: 160px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: middle;
        word-break: break-all;
    }

    .n8n-chat-widget .chat-code-block {
        background: #23272e;
        color: #f8f8f2;
        border-radius: 6px;
        padding: 12px;
        margin: 8px 0;
        font-family: 'Fira Mono', 'Consolas', 'Menlo', monospace;
        font-size: 12px;
        white-space: pre-wrap;
        word-break: break-all;
        max-width: 100%;
        box-sizing: border-box;
        overflow-x: hidden;
    }

    .n8n-chat-widget .chat-code-block-wrapper {
        position: relative;
    }

    .n8n-chat-widget .copy-code-btn {
        position: absolute;
        top: 8px;
        right: 12px;
        background: #007bff;
        color: #fff;
        border: none;
        border-radius: 4px;
        padding: 2px 10px;
        font-size: 12px;
        cursor: pointer;
        z-index: 2;
        opacity: 0.85;
        transition: opacity 0.2s;
    }

    .n8n-chat-widget .copy-code-btn:hover {
        opacity: 1;
    }

    .n8n-chat-widget .copy-code-btn.copied svg rect {
        stroke: #007bff;
    }

    .n8n-chat-widget .file-preview {
        max-width: 90%;
        box-sizing: border-box;
        overflow: hidden;
        word-break: break-all;
    }

    .n8n-chat-widget .file-preview-name {
        display: inline-block;
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: middle;
        word-break: break-all;
    }

    .n8n-chat-widget .resize-handle {
        position: absolute;
        left: 0;
        top: 0;
        width: 18px;
        height: 18px;
        cursor: nwse-resize;
        z-index: 10;
        background: transparent;
    }

    .n8n-chat-widget .resize-handle::after {
        content: '';
        display: block;
        width: 14px;
        height: 14px;
        border-top: 2px solid #103278;
        border-left: 2px solid #103278;
        border-radius: 4px 0 0 0;
        position: absolute;
        left: 2px;
        top: 2px;
    }
    .n8n-chat-widget .message-actions {
        display: flex;
        gap: 8px;
        margin-top: 4px;
        opacity: 0.5;
        transition: opacity 0.2s;
    }

    .n8n-chat-widget .message-actions button {
        background: none;
        border: none;
        cursor: pointer;
        padding: 4px;
        border-radius: 50%;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--chat--color-font);
        transition: background-color 0.2s;
    }

    .n8n-chat-widget .message-actions button:hover {
        opacity: 1;
        background-color: #555555; /* Darker shade on hover for feedback */
    }

    .n8n-chat-widget .message-actions button:active {
        background-color: #007BFF; /* Blue background color on click */
        color: #ffffff; /* Optional: Change text/icon color to white for contrast */
    }
    
    .n8n-chat-widget .csv-expand-button {
        background: var(--chat--color-primary);
        color: #ffffff;
        border: none;
        border-radius: 4px;
        padding: 4px 8px;
        cursor: pointer;
        font-size: 12px;
        margin-left: 8px;
        transition: background 0.2s;
    }

    .n8n-chat-widget .csv-expand-button:hover {
        background: var(--chat--color-secondary);
    }

    .n8n-chat-widget .csv-modal-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.4); /* Semi-transparent backdrop */
        z-index: 1001;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: auto; /* Ensure backdrop can scroll if modal overflows */
    }

    .n8n-chat-widget .csv-modal {
        background: #ffffff;
        border-radius: 8px;
        padding: 24px;
        width: auto;
        max-width: 90vw; /* Maximum width of 90% of viewport width */
        max-height: 90vh; /* Maximum height of 90% of viewport height */
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15); /* Subtle shadow for depth */
        position: relative;
        display: flex;
        flex-direction: column;
    }

    .n8n-chat-widget .csv-modal-close {
        position: absolute;
        top: 12px;
        right: 12px;
        background: none;
        border: none;
        font-size: 28px;
        color: #5f6368; /* Google Sheets close button color */
        cursor: pointer;
        line-height: 1;
        transition: color 0.2s;
    }

    .n8n-chat-widget .csv-modal-close:hover {
        color: #d93025; /* Google Sheets close button hover color */
    }

    .n8n-chat-widget .table-container {
        max-width: 340px; /* Constrain width in widget */
        overflow-x: auto; /* Allow horizontal scrolling in widget */
    }



    /* Fullscreen Table Popup Styles */
    .n8n-chat-widget .dialog-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.8);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .n8n-chat-widget .table-dialog {
        position: relative;
        width: 95vw;
        height: 90vh;
        background: #ffffff;
        border-radius: 12px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        display: flex;
        flex-direction: column;
        max-width: none;
        max-height: none;
        overflow: hidden;
        z-index: 10000;
    }

    .n8n-chat-widget .table-dialog .dialog-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 30px;
        border-bottom: 1px solid #e0e0e0;
        background: #f8f9fa;
        flex-shrink: 0;
    }

    .n8n-chat-widget .table-dialog h3 {
        margin: 0;
        font-size: 24px;
        color: #333;
        font-weight: 600;
    }

    .n8n-chat-widget .dialog-close-button {
        background: none;
        border: none;
        font-size: 32px;
        cursor: pointer;
        color: #666;
        padding: 0;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
    }

    .n8n-chat-widget .dialog-close-button:hover {
        background-color: #f0f0f0;
        color: #333;
    }

    .n8n-chat-widget .table-dialog .table-container {
        flex: 1;
        overflow: auto;
        padding: 20px;
        max-width: none;
    }

    .n8n-chat-widget .table-dialog table {
        width: 100%;
        box-sizing: border-box;
        border-collapse: collapse;
        margin-left: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        background: white;
        font-size: 14px;
    }

    .n8n-chat-widget .table-dialog thead {
        position: sticky;
        top: 0;
        z-index: 10;
    }

    .n8n-chat-widget .table-dialog th {
        padding: 12px 16px;
        background-color: #f8f9fa;
        font-size: 16px;
        font-weight: 600;
        color: #495057;
        text-align: left;
        border: 1px solid #dee2e6;
        white-space: normal;
        word-break: break-word;
    }

    .n8n-chat-widget .table-dialog td {
        padding: 12px 16px;
        font-size: 16px;
        border: 1px solid #dee2e6;
        white-space: normal;
        word-break: break-word;
        color: #495057;
        vertical-align: top;
    }

    .n8n-chat-widget .table-dialog tbody tr {
        transition: background-color 0.15s ease;
    }

    .n8n-chat-widget .table-dialog tbody tr:nth-child(even) {
        background-color: #f8f9fa;
    }

    .n8n-chat-widget .table-dialog tbody tr:nth-child(odd) {
        background-color: #ffffff;
    }

    .n8n-chat-widget .table-dialog tbody tr:hover {
        background-color: #e3f2fd !important;
    }

    /* Ellipsis cells styling */
    .n8n-chat-widget .table-dialog td.ellipsis {
        text-align: center;
        color: #888;
        font-style: italic;
    }

    /* Responsive adjustments for smaller screens */
    @media (max-width: 768px) {
        .n8n-chat-widget .table-dialog {
            width: 98vw;
            height: 95vh;
            border-radius: 8px;
        }
        
        .n8n-chat-widget .table-dialog .dialog-header {
            padding: 15px 20px;
        }
        
        .n8n-chat-widget .table-dialog h3 {
            font-size: 20px;
        }
        
        .n8n-chat-widget .dialog-close-button {
            font-size: 28px;
            width: 35px;
            height: 35px;
        }
        
        .n8n-chat-widget .table-dialog .table-container {
            padding: 15px;
        }
        
        .n8n-chat-widget .table-dialog th,
        .n8n-chat-widget .table-dialog td {
            padding: 8px 12px;
            font-size: 14px;
        }
    }

    /* Extra small screens */
    @media (max-width: 480px) {
        .n8n-chat-widget .table-dialog {
            width: 100vw;
            height: 100vh;
            border-radius: 0;
        }
        
        .n8n-chat-widget .table-dialog th,
        .n8n-chat-widget .table-dialog td {
            padding: 6px 8px;
            font-size: 12px;
        }
    }

    .n8n-chat-widget .dialog-close-button {
        position: absolute;
        top: 10px;
        right: 10px;
        background: none;
        border: none;
        font-size: 20px;
        cursor: pointer;
        color: #333;
        flex-shrink: 0; /* Prevent the close button from shrinking */
    }
    .n8n-chat-widget    .message-content {
        max-width: 600px;
    }

    .n8n-chat-widget .message-content.typing::after {
        content: '|';
        animation: blink 0.7s infinite;
        display: inline-block;
        color: var(--chat--color-font);
        font-family: var(-fira-font);
    }
    @keyframes blink {
        0% { opacity: 1; }
        50% { opacity: 0; }
        100% { opacity: 1; }
    }
    
    .dialog-backdrop {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.8);
        z-index: 9998;
    }

    .image-dialog {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 9999;
        background: white;
        padding: 0;
        border-radius: 12px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.3);
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        max-width: 95vw;
        max-height: 95vh;
        overflow: auto;
    }

    .dialog-close-button {
        background: white;
        border: none;
        font-size: 24px;
        padding: 8px 12px;
        cursor: pointer;
        align-self: flex-end;
    }

    .responsive-popup-image {
        max-width: 100%;
        max-height: 90vh;
        object-fit: contain;
        border-radius: 0 0 12px 12px;
    }

    /* Avatar container positioned below header */
    .n8n-chat-widget #chat-avatar-container {
        width: 100%;
        height: 180px; /* Less than half of typical chat widget height */
        max-height: 40vh; /* Responsive height limit */
        margin: 0;
        overflow: hidden;
        background: transparent;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        position: relative;
        box-sizing: border-box;
    }

    .n8n-chat-widget #chat-avatar-container canvas {
        width: 100% !important;
        height: 100% !important;
        display: block;
        object-fit: cover;
    }

    /* Branding message container */
    .n8n-chat-widget .chat-branding-message {
        width: 100%;
        margin: 0;
        padding: 0;
        background: #ffffff;
        border-bottom: 1px solid #e0e0e0;
        position: sticky;
        top: 0;
        z-index: 10;
    }

    /* Ensure messages container accounts for avatar space */
    .n8n-chat-widget .messages-container {
        padding-top: 0; /* Remove top padding since avatar is positioned */
    }

    /* Make sure avatar doesn't interfere with chat messages */
    .n8n-chat-widget .message {
        margin-top: 10px;
    }

    /* For smaller screens, reduce avatar height further */
    @media (max-height: 600px) {
        .n8n-chat-widget #chat-avatar-container {
            height: 120px;
            max-height: 30vh;
        }
    }

    /* Compact mode for very small screens */
    @media (max-height: 400px) {
        .n8n-chat-widget #chat-avatar-container {
            height: 80px;
            max-height: 25vh;
        }
    }


    .n8n-chat-widget .toggle-switch {
        display: flex;
        align-items: center;
        gap: 6px;
    }

    .n8n-chat-widget .toggle-switch .toggle-label {
        position: absolute;
        right: 152px;
        color: #ffffff;
        font-size: 14px;
        letter-spacing: 0.5px;
    }

    .n8n-chat-widget .toggle-switch .toggle-input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    .n8n-chat-widget .toggle-switch .toggle-slider {
        position: absolute;
        right: 109px;
        display: inline-block;
        width: 40px;
        height: 20px;
        background-color: #ccc;
        border-radius: 20px;
        cursor: pointer;
        transition: 0.4s;
    }

    .n8n-chat-widget .toggle-switch .toggle-slider:before {
        content: "";
        position: absolute;
        height: 16px;
        width: 16px;
        left: 2px;
        bottom: 2px;
        background-color: white;
        border-radius: 50%;
        transition: 0.4s;
    }

    .n8n-chat-widget .toggle-switch .toggle-input:checked + .toggle-slider {
        background-color: #4CAF50;
    }

    .n8n-chat-widget .toggle-switch .toggle-input:checked + .toggle-slider:before {
        transform: translateX(20px);
    }

    .n8n-chat-widget .brand-header button {
        background: none;
        border: none;
        color: #ffffff;
        font-size: 30px;
        cursor: pointer;
        padding: 0 6px;
        transition: color 0.3s;
    }

    .n8n-chat-widget .brand-header button:hover {
        color: #ddd;
    }



    .n8n-chat-widget .chat-branding-message-video-off {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 20px 0 40px 0;
        text-align: center;
    }

    .n8n-chat-widget .chat-branding-message-video-off img {
        width: 50px;
        height: 50px;
        margin-bottom: 8px;
        border-radius: 50%;
        background-color: #ffffff;
    }

    .n8n-chat-widget .chat-branding-message-video-off span {
        font-size: 18px;
        font-weight: 500;
        color: var(--chat--color-font);
    }

    `;
    
    


    
    // Load Geist font
    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://cdn.jsdelivr.net/npm/geist@1.0.0/dist/fonts/geist-sans/style.css';
    document.head.appendChild(fontLink);

    // Inject styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);



    
    // Default configuration
    const defaultConfig = {
        webhook: {
            url: '',
            route: 'general'
        },
        branding: {
            logo: "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' width='370' height='370'%3E%3Cpath d='M0 0 C122.1 0 244.2 0 370 0 C370 122.1 370 244.2 370 370 C247.9 370 125.8 370 0 370 C0 247.9 0 125.8 0 0 Z ' fill='%23F9F9F9' transform='translate(0,0)'/%3E%3Cpath d='M0 0 C0.99 0.99 0.99 0.99 2 2 C1.70419816 5.60138738 0.08656 7.1863546 -2.5 9.5625 C-6.95999891 13.86462284 -10.80253051 18.50605203 -14.66503906 23.34423828 C-16.15334943 25.19020041 -17.66491541 27.01553911 -19.1796875 28.83984375 C-25.61779594 36.61871798 -31.58476788 44.46145973 -37 53 C-37.70382813 54.0621875 -38.40765625 55.124375 -39.1328125 56.21875 C-48.56488232 70.48379832 -56.63436861 85.57716016 -64 101 C-64.40250977 101.84079102 -64.80501953 102.68158203 -65.21972656 103.54785156 C-70.4508999 114.55354226 -75.14133257 125.50555184 -78.74609375 137.15234375 C-79.5377021 139.69215267 -80.42456473 141.96964393 -81.5 144.42578125 C-83.26658154 148.63521383 -84.45623711 152.82842316 -85.5625 157.25 C-85.8867395 158.53825684 -85.8867395 158.53825684 -86.2175293 159.85253906 C-88.36582853 168.81835844 -89.30440088 177.82224444 -90 187 C-76.42543086 180.37137923 -63.33976097 173.35092349 -50.82714844 164.86303711 C-30.40804657 151.10520556 -8.58870275 138.53926511 16.625 138.75 C18.36704712 138.76015137 18.36704712 138.76015137 20.14428711 138.77050781 C35.13468978 138.95115303 49.0570039 141.98371949 63.53076172 145.63916016 C75.33403593 148.61800846 86.8643801 150.93435579 99 152 C99.33 151.34 99.66 150.68 100 150 C100 150.66 100 151.32 100 152 C115.6082099 150.78084457 115.6082099 150.78084457 128.4375 142.6875 C133.76574638 135.55306841 134.58665743 128.68019395 135 120 C143.00280492 135.72965105 144.82163562 155.93054889 140 173 C135.77510119 182.80608617 129.3022432 190.64006315 119.625 195.375 C102.20945622 202.14937675 84.60966419 198.69945712 67 195 C43.44438601 190.12021344 21.28135773 188.14571391 -1 199 C-2.12664062 199.51949219 -3.25328125 200.03898438 -4.4140625 200.57421875 C-13.20157787 204.71648971 -21.54201985 209.57777262 -29.875 214.5625 C-30.92067139 215.18753418 -31.96634277 215.81256836 -33.04370117 216.45654297 C-38.78149579 219.92866302 -44.34146746 223.56203175 -49.80664062 227.44848633 C-62.53352955 236.45108864 -75.97083174 242.87807622 -91 247 C-91.61617187 247.19464844 -92.23234375 247.38929688 -92.8671875 247.58984375 C-104.98987585 249.92112997 -118.31900106 248.14842118 -129 242 C-130.98392424 240.11788602 -132.77384842 238.2964838 -134.5625 236.25 C-135.04138672 235.71141357 -135.52027344 235.17282715 -136.01367188 234.61791992 C-148.97472394 219.89489173 -151.19053143 203.17529676 -150.24707031 183.953125 C-148.8899522 167.73207692 -144.88365579 151.50147274 -140 136 C-139.74492676 135.17870605 -139.48985352 134.35741211 -139.22705078 133.51123047 C-133.2993833 114.58025177 -125.82163762 96.81013179 -116.31201172 79.40478516 C-114.9993516 76.99881155 -113.7037376 74.58424433 -112.41015625 72.16796875 C-102.64227869 54.03692229 -92.07982606 36.31784877 -80.10302734 19.55224609 C-79.14149426 18.19911919 -78.20340989 16.82939016 -77.26953125 15.45703125 C-74.39730971 11.35275758 -71.38613038 8.51005351 -67.28125 5.64453125 C-63.55500405 2.95831628 -60.11011431 -0.07127754 -56.61328125 -3.046875 C-54.08580977 -4.93586714 -51.94952911 -5.94523312 -49 -7 C-47.68040505 -7.67378162 -46.36740025 -8.36068248 -45.0625 -9.0625 C-28.72302923 -17.21707818 -13.16477101 -10.08406152 0 0 Z ' fill='%23C15566' transform='translate(179,72)'/%3E%3Cpath d='M0 0 C8.89829502 3.84791136 15.30232168 13.47602078 21 21 C21.49097168 21.64694824 21.98194336 22.29389648 22.48779297 22.96044922 C31.23683309 34.53429154 39.45551391 46.4093706 47.39648438 58.54980469 C48.85615577 60.78020391 50.32513007 63.00412177 51.796875 65.2265625 C59.9283428 77.57456814 67.46060062 90.28496223 75 103 C75.49983398 103.84224121 75.99966797 104.68448242 76.51464844 105.55224609 C78.99096085 109.72982184 81.45414366 113.914732 83.89892578 118.11083984 C84.64038531 119.38299369 85.38358441 120.65413507 86.12841797 121.92431641 C97.11433597 140.67572821 97.11433597 140.67572821 97 148 C89.00400652 148.32759176 81.7926459 147.43533639 74 145.6875 C72.99710938 145.47416016 71.99421875 145.26082031 70.9609375 145.04101562 C65.07600938 143.76746852 59.27353021 142.290403 53.47363281 140.67602539 C50.29403039 139.80706377 47.09720512 139.06819306 43.875 138.375 C42.77929688 138.13523438 41.68359375 137.89546875 40.5546875 137.6484375 C22.06156555 134.2749669 2.60912899 134.01363875 -15 141 C-16.17912964 141.44315552 -16.17912964 141.44315552 -17.38208008 141.89526367 C-23.1184195 144.09587301 -28.40092091 146.69096176 -33.6875 149.8125 C-34.48857178 150.27970459 -35.28964355 150.74690918 -36.11499023 151.22827148 C-43.73538193 155.73073259 -51.09904623 160.60878779 -58.47851562 165.4921875 C-67.07173771 171.13966002 -75.90694323 176.20621313 -85 181 C-85.75925781 181.41636719 -86.51851563 181.83273437 -87.30078125 182.26171875 C-89 183 -89 183 -92 183 C-92.8186785 162.85141251 -86.34883546 143.39274813 -78.79931641 124.97949219 C-77.70066983 122.25871441 -76.69966288 119.5039414 -75.6875 116.75 C-59.23468454 74.17566908 -33.23515233 31.72446359 0 0 Z ' fill='%23FDFDFD' transform='translate(181,76)'/%3E%3Cpath d='M0 0 C2.58266591 2.20451857 5.09414576 4.46679437 7.5859375 6.7734375 C9.74319181 8.76313807 11.94701779 10.66803821 14.1875 12.5625 C17.49887722 15.44917152 20.37682939 18.54970985 23.21484375 21.8984375 C25.11999395 24.14126203 27.08733782 26.31870135 29.0625 28.5 C33.2521305 33.2092746 37.22175699 38.03468519 40.46875 43.44921875 C41.94472518 45.9079223 43.52414635 48.22748336 45.1875 50.5625 C49.23787999 56.30053831 53.12518226 62.14248331 57 68 C48.10198395 51.96534991 37.4867252 36.59774226 25.375 22.8125 C23 20 23 20 23 18 C34.03860201 22.74487793 41.16815303 37.23114744 47.53857422 46.80712891 C48.75533711 48.63288304 49.98713432 50.44860661 51.22265625 52.26171875 C57.13941414 60.97283868 62.560866 69.98657795 68 79 C68.39864258 79.65935547 68.79728516 80.31871094 69.20800781 80.99804688 C75.22123134 90.94990614 81.13617887 100.95947528 87 111 C87.36512695 111.62293945 87.73025391 112.24587891 88.10644531 112.88769531 C92.74372194 120.81345619 97.03524367 128.86207185 101.07177734 137.11132812 C102.79897813 140.62569563 104.55841142 144.12399866 106.3125 147.625 C106.97538692 148.95045757 107.63815497 150.27597461 108.30078125 151.6015625 C109.22473815 153.4494763 110.16796881 155.29012795 111.203125 157.078125 C113.43582413 162.46286996 112.79287415 169.40546093 111.125 174.86328125 C107.39310139 182.95315357 102.55223713 187.2817991 94.25 190.375 C88.42343132 192.15534043 83.04876861 192.42865289 77 192 C76.64550781 191.195625 76.29101562 190.39125 75.92578125 189.5625 C68.66019241 173.51839098 60.29790369 157.8660242 50.87890625 142.98046875 C49.14145571 140.22438816 47.46674144 137.44135486 45.80688477 134.63842773 C40.4480597 125.59796712 34.77431379 116.77951925 29 108 C28.18523193 106.75742432 28.18523193 106.75742432 27.35400391 105.48974609 C17.05020696 89.80007414 6.52742048 74.34363688 -5.375 59.8125 C-5.93380859 59.12961914 -6.49261719 58.44673828 -7.06835938 57.74316406 C-17.14191483 45.63932602 -29.83642288 31.80388583 -46 29 C-58.54262434 27.98953282 -70.68721761 31.42297635 -80.78125 39.12109375 C-81.6784375 39.88550781 -82.575625 40.64992187 -83.5 41.4375 C-87.21931018 44.55299311 -90.88198823 47.44015484 -95 50 C-93.48064878 45.11045151 -90.64529446 41.93860922 -87.3125 38.1875 C-86.76940186 37.56584961 -86.22630371 36.94419922 -85.66674805 36.30371094 C-84.59317099 35.07612469 -83.51683893 33.85094126 -82.4375 32.62841797 C-80.71701027 30.6794257 -79.01560015 28.71418861 -77.3125 26.75 C-76.20954718 25.49892882 -75.10534264 24.24896024 -74 23 C-73.35160156 22.25878906 -72.70320313 21.51757812 -72.03515625 20.75390625 C-67.60990492 15.752492 -63.04756112 10.89487818 -58.375 6.125 C-57.84890137 5.57755127 -57.32280273 5.03010254 -56.78076172 4.46606445 C-53.13768379 0.79182489 -49.59240123 -1.60597918 -45 -4 C-43.96617187 -4.55042969 -42.93234375 -5.10085937 -41.8671875 -5.66796875 C-40.87976563 -6.16941406 -39.89234375 -6.67085937 -38.875 -7.1875 C-37.88242188 -7.69667969 -36.88984375 -8.20585937 -35.8671875 -8.73046875 C-22.94614687 -14.45163797 -10.36926464 -7.89041686 0 0 Z ' fill='%233878D6' transform='translate(202,32)'/%3E%3Cpath d='M0 0 C5.39700024 5.39700024 5.30260035 17.71106473 5.3125 25.125 C5.07920652 38.83471451 3.30877671 49.8658241 -6.14453125 60.38671875 C-16.91432848 70.59067725 -30.05977401 72.69505045 -44.515625 72.3203125 C-53.13087862 71.86384982 -61.58063525 69.76874917 -70 68 C-93.55561399 63.12021344 -115.71864227 61.14571391 -138 72 C-139.12664062 72.51949219 -140.25328125 73.03898437 -141.4140625 73.57421875 C-151.44339822 78.30528753 -160.86798298 84.00285572 -170.30737305 89.80810547 C-175.44053009 92.94963474 -180.37954287 95.83940869 -186 98 C-186.71285156 98.31324219 -187.42570312 98.62648438 -188.16015625 98.94921875 C-195.48830068 101.79320088 -203.83924905 102.37401927 -211.46484375 100.34375 C-217.55409654 97.63222093 -221.65739272 93.1956627 -224.22265625 87.08984375 C-226.57137877 80.296227 -228.16008324 73.84615977 -228.0625 66.625 C-228.05347656 65.75101562 -228.04445313 64.87703125 -228.03515625 63.9765625 C-228.02355469 63.32429688 -228.01195312 62.67203125 -228 62 C-226.02 61.505 -226.02 61.505 -224 61 C-224 62.32 -224 63.64 -224 65 C-209.66423365 58.37422564 -196.24870528 50.03484815 -183.25585938 41.08203125 C-169.00058845 31.28252354 -153.85433371 23.17741533 -137 19 C-136.30060303 18.81961182 -135.60120605 18.63922363 -134.88061523 18.45336914 C-114.73772954 13.54202034 -93.50296409 18.5588507 -73.953125 23.890625 C-61.07367675 27.36194296 -49.06328981 29.65072747 -35.75 29.6875 C-34.50702148 29.69434814 -33.26404297 29.70119629 -31.98339844 29.70825195 C-24.78563981 29.56368496 -19.27550006 28.56591379 -13 25 C-11.906875 24.401875 -10.81375 23.80375 -9.6875 23.1875 C-2.38074547 17.24014166 -1.61850386 8.84046427 0 0 Z ' fill='%235F2390' transform='translate(316,199)'/%3E%3Cpath d='M0 0 C57.09 0 114.18 0 173 0 C173 54.12 173 108.24 173 164 C172.67 164 172.34 164 172 164 C171.85304688 162.94425781 171.70609375 161.88851562 171.5546875 160.80078125 C164.33896672 112.03188416 138.83306622 67.18106424 99.24975586 37.48364258 C83.7876746 26.14314882 66.94453417 17.64892213 49 11 C47.77539062 10.54625 46.55078125 10.0925 45.2890625 9.625 C30.48575175 4.41125533 15.53389768 2.5282191 0 1 C0 0.67 0 0.34 0 0 Z ' fill='%237F7F7F' transform='translate(196,1)'/%3E%3Cpath d='M0 0 C54.78 0 109.56 0 166 0 C166 0.33 166 0.66 166 1 C164.21722656 1.22042969 164.21722656 1.22042969 162.3984375 1.4453125 C112.5301071 8.02689372 66.82913721 33.15286156 35.92944336 73.11499023 C18.33717893 96.57029547 7.0215675 123.40820073 1 152 C0.67 152 0.34 152 0 152 C0 101.84 0 51.68 0 0 Z ' fill='%237F7F7F' transform='translate(0,1)'/%3E%3Cpath d='M0 0 C0.33 0 0.66 0 1 0 C1 52.8 1 105.6 1 160 C-48.5 160 -98 160 -149 160 C-149 159.67 -149 159.34 -149 159 C-148.07445312 158.82726562 -147.14890625 158.65453125 -146.1953125 158.4765625 C-98.54793466 148.80634092 -56.95751548 119.65992158 -29.875 79.6875 C-13.8952064 55.44024106 -4.48964669 28.61312142 0 0 Z ' fill='%237D7D7D' transform='translate(368,210)'/%3E%3Cpath d='M0 0 C0.33 0 0.66 0 1 0 C1.09909668 0.5355249 1.19819336 1.0710498 1.30029297 1.62280273 C6.72787352 30.00515075 18.25489074 57.11138081 36 80 C36.72832031 80.93972656 37.45664062 81.87945312 38.20703125 82.84765625 C47.12396377 94.01390509 56.54642587 104.3943416 68 113 C68.51755859 113.39251953 69.03511719 113.78503906 69.56835938 114.18945312 C93.38519483 132.14455847 119.67443258 144.36399251 149 150 C149 150.33 149 150.66 149 151 C99.83 151 50.66 151 0 151 C0 101.17 0 51.34 0 0 Z ' fill='%237E7E7E' transform='translate(0,219)'/%3E%3Cpath d='M0 0 C-1.50143479 3.38209795 -3.47247835 5.88455808 -5.875 8.6875 C-19.56477885 25.22020418 -31.26547809 43.67045137 -42.0625 62.1875 C-42.50343994 62.9407959 -42.94437988 63.6940918 -43.39868164 64.47021484 C-45.88680492 68.80504855 -48.01524015 73.18727282 -49.99682617 77.77368164 C-51.32503366 80.721339 -52.85092108 83.53803001 -54.39868164 86.375 C-67.58090598 110.5612193 -78.15035033 136.80991919 -83.56298828 163.88623047 C-84.04067217 166.19672604 -84.58018187 168.4886772 -85.12109375 170.78515625 C-89.65942315 190.91384551 -91.68704428 214.12442658 -81.4375 232.85546875 C-80.04302568 234.99250064 -78.55400956 236.97893838 -77 239 C-76.55914062 239.82242188 -76.11828125 240.64484375 -75.6640625 241.4921875 C-72.44638179 246.34136829 -67.31154439 248.88673709 -62 251 C-58.86961475 251.15072225 -56.24430406 250.88689604 -53.1796875 250.26953125 C-52.46039063 250.18058594 -51.74109375 250.09164062 -51 250 C-50.34 250.66 -49.68 251.32 -49 252 C-63.40243832 256.66206096 -77.95164298 256.66193901 -91.953125 250.75390625 C-95.46045955 248.73494059 -97.93018431 246.26176119 -100.5625 243.25 C-101.04138672 242.71141357 -101.52027344 242.17282715 -102.01367188 241.61791992 C-114.97472394 226.89489173 -117.19053143 210.17529676 -116.24707031 190.953125 C-114.8899522 174.73207692 -110.88365579 158.50147274 -106 143 C-105.74492676 142.17870605 -105.48985352 141.35741211 -105.22705078 140.51123047 C-99.2993833 121.58025177 -91.82163762 103.81013179 -82.31201172 86.40478516 C-80.9993516 83.99881155 -79.7037376 81.58424433 -78.41015625 79.16796875 C-69.65546567 62.91759084 -60.19105537 47.03946914 -49.9375 31.6875 C-49.50888672 31.02975586 -49.08027344 30.37201172 -48.63867188 29.69433594 C-46.0819972 25.95625946 -44.21391197 24.47821356 -40 23 C-37.81439692 20.95167547 -37.81439692 20.95167547 -35.6875 18.5 C-27.17563784 9.72054936 -12.90637373 -1.24900391 0 0 Z ' fill='%23D4545B' transform='translate(145,65)'/%3E%3Cpath d='M0 0 C4.8714404 2.86197123 8.14395694 6.94665485 11 11.75 C12.54946573 18.41270262 12.44438239 24.64724215 8.91796875 30.62890625 C2.90101116 39.04537563 -5.81185099 40.87414774 -15.375 43.4375 C-17.11257568 43.90639648 -17.11257568 43.90639648 -18.88525391 44.38476562 C-24.13309249 45.79731272 -29.38176927 47.20594473 -34.63891602 48.58349609 C-40.90333676 50.22780992 -47.13250271 51.91022782 -53.30493164 53.87475586 C-59.44995539 55.54526886 -64.61664067 54.47204067 -70.26171875 51.703125 C-74.55885017 49.12961191 -77.46855809 46.20918192 -79.75 41.75 C-81.15458503 34.30569933 -81.45064564 27.06042416 -77.375 20.4375 C-72.04553485 14.65796927 -66.66142393 11.93452709 -59.1875 9.8125 C-58.23713867 9.52600586 -57.28677734 9.23951172 -56.30761719 8.94433594 C-48.00856555 6.49377466 -39.61402578 4.46733687 -31.171875 2.578125 C-27.77255278 1.80897346 -24.47268462 0.87046478 -21.1484375 -0.17578125 C-14.16694267 -2.31294578 -6.84030608 -3.02853246 0 0 Z ' fill='%23133579' transform='translate(214.375,131.5625)'/%3E%3Cpath d='M0 0 C122.1 0 244.2 0 370 0 C370 122.1 370 244.2 370 370 C369.67 370 369.34 370 369 370 C368.8680832 349.17750986 368.73764074 328.35501093 368.60884857 307.53250122 C368.54898547 297.85939101 368.48867965 288.18628397 368.42724609 278.51318359 C368.37356217 270.06012059 368.32079585 261.60705239 368.26903296 253.15397739 C368.24171804 248.69815717 368.214011 244.24234034 368.18519592 239.78652954 C367.94429256 202.42818988 367.95937774 165.07464194 368.20263672 127.71636963 C368.2287545 123.66801483 368.25346365 119.6196518 368.27832031 115.57128906 C368.35086241 103.88085091 368.4255504 92.19042616 368.5 80.5 C368.665 54.265 368.83 28.03 369 1 C315.54 1.33 262.08 1.66 207 2 C215.415 3.485 215.415 3.485 224 5 C258.68789286 12.4597619 288.53675743 29.64647307 314 54 C314.9384375 54.88558594 315.876875 55.77117188 316.84375 56.68359375 C337.2179217 76.39961103 354.96049181 104.43148271 362 132 C361.67 132.66 361.34 133.32 361 134 C360.34 134 359.68 134 359 134 C358.5875 132.8140625 358.175 131.628125 357.75 130.40625 C353.88771235 119.49956686 349.49441556 109.1800489 344 99 C343.67386719 98.38785645 343.34773438 97.77571289 343.01171875 97.14501953 C330.82778104 74.42149029 313.477571 55.43703145 293 40 C292.154375 39.35933594 291.30875 38.71867187 290.4375 38.05859375 C248.90905052 7.82419895 200.87713868 1.54805836 151 6 C151 5.01 151 4.02 151 3 C155.95 2.505 155.95 2.505 161 2 C107.87 1.67 54.74 1.34 0 1 C0 0.67 0 0.34 0 0 Z ' fill='%23D6D6D7' transform='translate(0,0)'/%3E%3Cpath d='M0 0 C3.99883302 7.73107718 1.97498303 14.04425464 -0.35107422 22.0703125 C-2.45968113 28.34060182 -6.5274427 30.92550872 -12.1875 33.875 C-33.31274243 43.67503566 -60.08060703 35.27893932 -81.3285675 29.66853333 C-92.48853041 26.77194659 -103.92630246 24.41316955 -115.5 24.5625 C-116.8161731 24.57494751 -116.8161731 24.57494751 -118.15893555 24.58764648 C-142.11819584 25.19720304 -165.24036618 37.17223165 -184.2578125 51.08984375 C-190.25366044 55.26643868 -196.58597509 58.94580486 -202.84814453 62.70605469 C-204.78747469 63.87220511 -206.72047875 65.04810865 -208.65234375 66.2265625 C-209.69519531 66.85304688 -210.73804688 67.47953125 -211.8125 68.125 C-212.70582031 68.66382813 -213.59914063 69.20265625 -214.51953125 69.7578125 C-217.04027043 71.02016693 -219.22204439 71.59103706 -222 72 C-222.495 69.525 -222.495 69.525 -223 67 C-222.40799805 66.67427002 -221.81599609 66.34854004 -221.20605469 66.01293945 C-209.59936275 59.6024226 -198.22484172 52.99938205 -187.16357422 45.68481445 C-166.13649864 31.81117112 -144.27457245 18.53353265 -118.375 18.75 C-116.63295288 18.76015137 -116.63295288 18.76015137 -114.85571289 18.77050781 C-99.86531022 18.95115303 -85.9429961 21.98371949 -71.46923828 25.63916016 C-59.66596407 28.61800846 -48.1356199 30.93435579 -36 32 C-35.67 31.34 -35.34 30.68 -35 30 C-35 30.66 -35 31.32 -35 32 C-19.3917901 30.78084457 -19.3917901 30.78084457 -6.5625 22.6875 C-1.23425362 15.55306841 -0.41334257 8.68019395 0 0 Z ' fill='%23C571CE' transform='translate(314,192)'/%3E%3Cpath d='M0 0 C-3.21930797 1.03235582 -5.44213157 0.93158763 -8.73828125 0.2578125 C-9.64126953 0.07863281 -10.54425781 -0.10054687 -11.47460938 -0.28515625 C-12.41111328 -0.47980469 -13.34761719 -0.67445313 -14.3125 -0.875 C-33.17789194 -4.68751823 -53.9896177 -7.31248414 -72 1 C-73.051875 1.268125 -74.10375 1.53625 -75.1875 1.8125 C-88.52042158 5.96537721 -100.28709881 14.62265368 -112 22 C-114.83185046 23.77320916 -117.66595987 25.54279319 -120.5 27.3125 C-121.78128612 28.11322346 -123.06253705 28.91400323 -124.34375 29.71484375 C-124.9521875 30.09495605 -125.560625 30.47506836 -126.1875 30.86669922 C-127.39641901 31.62259928 -128.6047525 32.37943658 -129.8125 33.13720703 C-140.55967395 39.87481307 -140.55967395 39.87481307 -145.6875 42.25 C-148.93637067 43.6733808 -148.93637067 43.6733808 -150.31640625 45.70703125 C-151.31460392 49.05527142 -150.3558238 51.16168634 -149.25 54.4375 C-148.88390625 55.54996094 -148.5178125 56.66242188 -148.140625 57.80859375 C-146.65403668 63.12352436 -146.65403668 63.12352436 -143.3125 67.125 C-142.549375 67.41375 -141.78625 67.7025 -141 68 C-140.02289063 68.50917969 -139.04578125 69.01835937 -138.0390625 69.54296875 C-133.15468138 71.64454385 -128.29228978 71.3269134 -123.0625 71.1875 C-122.09248047 71.17396484 -121.12246094 71.16042969 -120.12304688 71.14648438 C-117.74810871 71.11138677 -115.37435622 71.06222275 -113 71 C-117.77704906 75.77704906 -124.58676175 76.24969664 -131.0625 76.4375 C-138.85275176 76.23624484 -143.77468217 74.54308167 -149.25 69 C-155.13617191 61.574121 -157.18799337 50.91150937 -157.0625 41.625 C-157.05347656 40.75101562 -157.04445313 39.87703125 -157.03515625 38.9765625 C-157.02355469 38.32429688 -157.01195312 37.67203125 -157 37 C-155.02 36.505 -155.02 36.505 -153 36 C-153 37.32 -153 38.64 -153 40 C-138.66423365 33.37422564 -125.24870528 25.03484815 -112.25585938 16.08203125 C-98.00058845 6.28252354 -82.85433371 -1.82258467 -66 -6 C-65.30060303 -6.18038818 -64.60120605 -6.36077637 -63.88061523 -6.54663086 C-42.95239145 -11.6494651 -20.08311729 -6.429839 0 0 Z ' fill='%23640D85' transform='translate(245,224)'/%3E%3Cpath d='M0 0 C0.99 0.99 0.99 0.99 2 2 C1.70419816 5.60138738 0.08656 7.1863546 -2.5 9.5625 C-6.95999891 13.86462284 -10.80253051 18.50605203 -14.66503906 23.34423828 C-16.15334943 25.19020041 -17.66491541 27.01553911 -19.1796875 28.83984375 C-26.55685477 37.75334015 -33.22557923 46.83057222 -39.2734375 56.7109375 C-39.66499023 57.34112793 -40.05654297 57.97131836 -40.45996094 58.62060547 C-41.21199076 59.83374997 -41.95310051 61.05376446 -42.68066406 62.28173828 C-45.19785349 66.34191077 -47.84167313 68.67589402 -52 71 C-52.66 71 -53.32 71 -54 71 C-48.10078014 54.89512977 -35.37575766 39.48848495 -25 26 C-23.98679687 24.64261719 -23.98679687 24.64261719 -22.953125 23.2578125 C-22.32921875 22.43023437 -21.7053125 21.60265625 -21.0625 20.75 C-20.51722656 20.02296875 -19.97195312 19.2959375 -19.41015625 18.546875 C-18.94480469 18.03640625 -18.47945312 17.5259375 -18 17 C-17.34 17 -16.68 17 -16 17 C-15.731875 16.21625 -15.46375 15.4325 -15.1875 14.625 C-14 12 -14 12 -11 10 C-9.19212694 7.62597583 -9.19212694 7.62597583 -8 5 C-8.7056059 1.81697297 -8.7056059 1.81697297 -11.4765625 0.46484375 C-23.04757705 -5.14839036 -32.70523298 -8.4707449 -45.3125 -4.125 C-55.65514417 0.22137308 -64.83526003 7.1077079 -72.3515625 15.40625 C-74.11234942 17.10862219 -75.76650983 18.02467678 -78 19 C-75.80556482 12.01770625 -69.86126477 7.91872929 -64.4375 3.375 C-63.87353516 2.89804688 -63.30957031 2.42109375 -62.72851562 1.9296875 C-58.23101837 -1.85767861 -54.47420419 -4.88496656 -49 -7 C-47.68415633 -7.68107851 -46.37191138 -8.3691355 -45.0625 -9.0625 C-28.72302923 -17.21707818 -13.16477101 -10.08406152 0 0 Z ' fill='%23B54048' transform='translate(179,72)'/%3E%3Cpath d='M0 0 C10.65873937 9.11901589 19.23293814 19.62409996 27.62255859 30.79858398 C27.12755859 31.78858398 27.12755859 31.78858398 26.62255859 32.79858398 C27.78328204 35.63785836 29.40400074 38.01541293 31.22412109 40.47045898 C31.71396484 41.13432617 32.20380859 41.79819336 32.70849609 42.48217773 C33.21638672 43.1640918 33.72427734 43.84600586 34.24755859 44.54858398 C34.76318359 45.2459668 35.27880859 45.94334961 35.81005859 46.66186523 C37.07814978 48.37613665 38.34998749 50.08763555 39.62255859 51.79858398 C38.96255859 52.45858398 38.30255859 53.11858398 37.62255859 53.79858398 C37.30206543 53.34233643 36.98157227 52.88608887 36.65136719 52.41601562 C30.43758627 43.60528312 24.09730978 34.94088067 17.24755859 26.61108398 C16.68987793 25.92989502 16.13219727 25.24870605 15.55761719 24.546875 C5.4868163 12.44010532 -7.21392962 -1.39754152 -23.37744141 -4.20141602 C-35.92006574 -5.21188319 -48.06465902 -1.77843966 -58.15869141 5.91967773 C-59.05587891 6.6840918 -59.95306641 7.44850586 -60.87744141 8.23608398 C-64.59675158 11.35157709 -68.25942963 14.23873883 -72.37744141 16.79858398 C-67.57239381 3.36788998 -53.29175877 -4.3458758 -41.15673828 -10.41796875 C-27.05605791 -16.62667941 -10.88288027 -8.95658992 0 0 Z ' fill='%23A172CA' transform='translate(179.37744140625,65.201416015625)'/%3E%3Cpath d='M0 0 C-0.48859497 0.86274536 -0.48859497 0.86274536 -0.98706055 1.74291992 C-12.76537473 22.67598171 -23.87579659 44.33570121 -30.8515625 67.3984375 C-32 71 -32 71 -33.48828125 74.3984375 C-35.25941618 78.61804062 -36.45356944 82.81776084 -37.5625 87.25 C-37.8867395 88.53825684 -37.8867395 88.53825684 -38.2175293 89.85253906 C-40.36582853 98.81835844 -41.30440088 107.82224444 -42 117 C-41.34 117.33 -40.68 117.66 -40 118 C-42.475 118.99 -42.475 118.99 -45 120 C-44.95875 121.2375 -44.9175 122.475 -44.875 123.75 C-44.7638784 127.08364791 -45.34123921 129.1004339 -47 132 C-50.89787569 90.06261457 -32.07526815 47.22964226 -12.6875 10.875 C-12.18355713 9.91916016 -11.67961426 8.96332031 -11.16040039 7.97851562 C-10.67821045 7.09615234 -10.19602051 6.21378906 -9.69921875 5.3046875 C-9.27471436 4.52077637 -8.85020996 3.73686523 -8.4128418 2.92919922 C-5.88507902 -0.52239599 -4.06962549 -1.35654183 0 0 Z ' fill='%23F8855D' transform='translate(131,142)'/%3E%3Cpath d='M0 0 C1.60511577 4.8153473 2.53060713 7.63644549 0.62890625 12.5234375 C-0.0443501 13.81551169 -0.73418922 15.09903614 -1.4375 16.375 C-2.18761445 17.80723173 -2.93761134 19.23952504 -3.6875 20.671875 C-4.4583189 22.11459104 -5.22915184 23.55729959 -6 25 C-21.17154433 53.86646889 -30.55157149 83.86629038 -36 116 C-36.66 115.01 -37.32 114.02 -38 113 C-38.33 115.31 -38.66 117.62 -39 120 C-41.47467367 116.2879895 -41.0517072 112.97627596 -40.5 108.75 C-40.36005615 107.64603882 -40.36005615 107.64603882 -40.21728516 106.51977539 C-35.5813975 73.5982053 -22.79842688 42.01047212 -7 13 C-6.26839033 11.63993603 -5.53786112 10.2792901 -4.80859375 8.91796875 C-3.21326024 5.94120992 -1.60975797 2.96899069 0 0 Z ' fill='%23F5973A' transform='translate(71,136)'/%3E%3Cpath d='M0 0 C-1 2 -1 2 -3.12963867 2.74609375 C-4.0497876 2.97425781 -4.96993652 3.20242187 -5.91796875 3.4375 C-6.92537109 3.69273438 -7.93277344 3.94796875 -8.97070312 4.2109375 C-10.03224609 4.47132812 -11.09378906 4.73171875 -12.1875 5 C-41.50654852 12.32522919 -67.828796 26.49629494 -89.96484375 47.1171875 C-91.65909563 48.68461438 -93.37699061 50.13489207 -95.1875 51.5625 C-115.93531303 69.54393796 -131.90309445 98.03617593 -140 124 C-140.31481323 124.97018066 -140.31481323 124.97018066 -140.63598633 125.95996094 C-145.13173082 140.01388491 -147.08428464 154.40546622 -149 169 C-149.33 169 -149.66 169 -150 169 C-151.24258519 141.49744777 -142.9726162 117.03565328 -130 93 C-129.67386719 92.38785645 -129.34773438 91.77571289 -129.01171875 91.14501953 C-116.45287384 67.72227343 -98.21998427 47.82408252 -77 32 C-76.16984375 31.37480469 -75.3396875 30.74960937 -74.484375 30.10546875 C-56.90508486 17.33955567 -37.0205612 7.56262191 -16 2 C-14.906875 1.69191406 -13.81375 1.38382812 -12.6875 1.06640625 C-3.83685025 -1.32709879 -3.83685025 -1.32709879 0 0 Z ' fill='%23DDDDE0' transform='translate(150,5)'/%3E%3Cpath d='M0 0 C5.19160652 5.19160652 5.15813695 16.66663287 5.20654297 23.77294922 C5.17946168 26.85118911 5.10915256 29.9235149 5 33 C4.67 33 4.34 33 4 33 C3.67 28.38 3.34 23.76 3 19 C2.2575 20.299375 2.2575 20.299375 1.5 21.625 C-3.53950715 29.01860218 -11.21311781 32.95624857 -19.87792969 34.67773438 C-36.32885121 37.17603355 -51.65316177 33.96969849 -67.53222656 29.86865234 C-73.67693714 28.32944647 -79.86866847 27.01227476 -86.0625 25.6875 C-87.22160889 25.43339355 -88.38071777 25.17928711 -89.57495117 24.91748047 C-99.37050801 22.80793298 -108.55028981 21.8420057 -118.5625 21.9375 C-119.47580078 21.94201172 -120.38910156 21.94652344 -121.33007812 21.95117188 C-123.55345738 21.9628126 -125.77669121 21.97916149 -128 22 C-123.71222532 19.14148355 -119.98541901 19.65935175 -114.9375 19.6875 C-113.9568457 19.69023926 -112.97619141 19.69297852 -111.96582031 19.69580078 C-100.13041524 19.86246965 -88.74826854 22.0018135 -77.23828125 24.66796875 C-74.82306659 25.09050701 -74.82306659 25.09050701 -71.640625 24.92578125 C-67.80259376 25.00402438 -65.07262067 25.8089707 -61.4375 27 C-53.25713538 29.33115516 -45.00701261 29.45494144 -36.5625 29.5 C-35.27077881 29.51804688 -33.97905762 29.53609375 -32.64819336 29.5546875 C-25.17975486 29.50824861 -19.49110308 28.77164067 -13 25 C-11.3603125 24.1028125 -11.3603125 24.1028125 -9.6875 23.1875 C-2.38074547 17.24014166 -1.61850386 8.84046427 0 0 Z ' fill='%236928A1' transform='translate(316,199)'/%3E%3Cpath d='M0 0 C5.7315161 3.2207311 8.89159822 7.41158438 12.625 12.75 C13.18445313 13.5234375 13.74390625 14.296875 14.3203125 15.09375 C17.33137425 19.32628019 19.95052591 23.54514034 22.15380859 28.25170898 C23.87284671 31.80336274 25.71833657 35.08853816 28.9609375 37.39453125 C31.25800479 39.20314171 32.26443436 40.80309205 33.625 43.375 C34.02976563 44.12523437 34.43453125 44.87546875 34.8515625 45.6484375 C36 48 36 48 36.90039062 50.38623047 C37.96528197 52.9174753 39.17365864 54.92659118 40.7421875 57.171875 C44.08648993 62.07793223 47.12347988 67.12878057 50.125 72.25 C50.68340576 73.20092529 51.24181152 74.15185059 51.81713867 75.1315918 C52.97576281 77.10864414 54.13257453 79.0867597 55.28759766 81.06591797 C56.40194106 82.9752677 57.51867883 84.88322271 58.63818359 86.78955078 C77 118.09078887 77 118.09078887 77 124 C76.34 124 75.68 124 75 124 C74.67 124.66 74.34 125.32 74 126 C73.71769531 125.34 73.43539062 124.68 73.14453125 124 C66.24244268 108.45512016 57.97152492 93.3502231 48.87890625 78.98046875 C47.14139813 76.22429683 45.4666638 73.44113717 43.80664062 70.63818359 C37.35260542 59.7491111 30.42135141 49.17703962 23.4453125 38.6171875 C22.85137695 37.71379639 22.25744141 36.81040527 21.64550781 35.87963867 C20.48572346 34.11613315 19.32117813 32.35574741 18.15136719 30.59887695 C17.36101074 29.39557739 17.36101074 29.39557739 16.5546875 28.16796875 C16.08530762 27.45922607 15.61592773 26.7504834 15.13232422 26.02026367 C13.9935433 23.98848012 13.54990577 22.2461059 13 20 C11.42443551 17.60559375 9.82486777 15.30180394 8.125 13 C7.67769531 12.38382813 7.23039063 11.76765625 6.76953125 11.1328125 C4.94139913 8.61980492 3.10203966 6.12962978 1.1796875 3.6875 C0 2 0 2 0 0 Z ' fill='%237287D9' transform='translate(204,96)'/%3E%3Cpath d='M0 0 C0.33 0 0.66 0 1 0 C1.05945801 0.60658447 1.11891602 1.21316895 1.18017578 1.83813477 C3.88444183 28.39024236 10.3931077 52.78071327 22.75 76.5 C23.11456299 77.20044434 23.47912598 77.90088867 23.85473633 78.62255859 C25.85792125 82.32279081 27.97690495 85.10392575 31 88 C32.03289949 89.92109808 32.9430615 91.87375514 33.83959961 93.86157227 C36.34346004 99.27507916 39.61211541 103.49831642 43.5625 107.9375 C44.13935547 108.60845703 44.71621094 109.27941406 45.31054688 109.97070312 C48.55515584 113.8219939 48.55515584 113.8219939 53 116 C54.3671875 117.4609375 54.3671875 117.4609375 55.875 119.375 C72.4082111 138.74445234 97.55469933 152.15018859 121 161 C121 161.99 121 162.98 121 164 C79.08716254 151.80717456 41.90956828 117.7749296 21.08984375 80.04394531 C7.5156149 54.58618457 -1.34131793 29.15130966 0 0 Z ' fill='%23DEDDE1' transform='translate(0,198)'/%3E%3Cpath d='M0 0 C0 0.66 0 1.32 0 2 C-0.91136719 2.23332031 -1.82273437 2.46664062 -2.76171875 2.70703125 C-21.88010471 7.94831829 -38.15682664 18.51465388 -54.51953125 29.3984375 C-59.41053504 32.64085561 -64.37504938 35.72077675 -69.4375 38.6875 C-70.09266602 39.07301025 -70.74783203 39.45852051 -71.42285156 39.85571289 C-83.74311806 47 -83.74311806 47 -87 47 C-87.33 45.35 -87.66 43.7 -88 42 C-87.40799805 41.67427002 -86.81599609 41.34854004 -86.20605469 41.01293945 C-74.60329394 34.60459385 -63.22646564 28.01053179 -52.17456055 20.68920898 C-44.83191088 15.83780223 -37.31024617 11.33825673 -29.66845703 6.97558594 C-28.17771795 6.10391585 -26.72433273 5.16907756 -25.27734375 4.2265625 C-23 3 -23 3 -19 3 C-18.505 3.99 -18.505 3.99 -18 5 C-17.03578125 4.6390625 -16.0715625 4.278125 -15.078125 3.90625 C-13.80220732 3.43716262 -12.52615871 2.96843127 -11.25 2.5 C-10.61578125 2.26152344 -9.9815625 2.02304688 -9.328125 1.77734375 C-5.96713393 0.55198242 -3.63128413 0 0 0 Z ' fill='%23A93E9E' transform='translate(179,217)'/%3E%3Cpath d='M0 0 C3.99883302 7.73107718 1.97498303 14.04425464 -0.35107422 22.0703125 C-2.45968113 28.34060182 -6.5274427 30.92550872 -12.1875 33.875 C-19.10899728 37.08589428 -24.85805439 37.21855259 -32.43945312 37.24023438 C-34.46527854 37.24983544 -36.49004215 37.28081933 -38.515625 37.3125 C-49.45119498 37.3557236 -58.04987584 35.4222774 -68 31 C-70.98351544 29.94784238 -73.9867687 28.96341409 -77 28 C-70.3356927 25.77856423 -63.89869479 27.47987248 -57.25 28.9375 C-50.17797169 30.42757559 -43.23788711 31.66798683 -36 32 C-35.67 31.34 -35.34 30.68 -35 30 C-35 30.66 -35 31.32 -35 32 C-19.3917901 30.78084457 -19.3917901 30.78084457 -6.5625 22.6875 C-1.23425362 15.55306841 -0.41334257 8.68019395 0 0 Z ' fill='%23BB61E7' transform='translate(314,192)'/%3E%3Cpath d='M0 0 C0.99 0.99 0.99 0.99 2 2 C1.8125 4 1.8125 4 1 6 C0.01 6.66 -0.98 7.32 -2 8 C-3.32 7.34 -4.64 6.68 -6 6 C-7.32 6.99 -8.64 7.98 -10 9 C-9.34 7.02 -8.68 5.04 -8 3 C-17.72275007 -3.392191 -27.14360196 -7.62547392 -39 -6 C-52.02024864 -2.74493784 -63.42591886 5.55169322 -72.3515625 15.40625 C-74.11234942 17.10862219 -75.76650983 18.02467678 -78 19 C-75.80556482 12.01770625 -69.86126477 7.91872929 -64.4375 3.375 C-63.87353516 2.89804688 -63.30957031 2.42109375 -62.72851562 1.9296875 C-58.23101837 -1.85767861 -54.47420419 -4.88496656 -49 -7 C-47.68415633 -7.68107851 -46.37191138 -8.3691355 -45.0625 -9.0625 C-28.72302923 -17.21707818 -13.16477101 -10.08406152 0 0 Z ' fill='%23470F60' transform='translate(179,72)'/%3E%3Cpath d='M0 0 C0.33 0 0.66 0 1 0 C1.00410889 0.88558594 1.00821777 1.77117187 1.01245117 2.68359375 C0.38408519 31.74251326 0.38408519 31.74251326 13 57 C22.90414505 66.52321639 33.52239942 69 47 69 C47.33 68.34 47.66 67.68 48 67 C49.546875 67.2784375 49.546875 67.2784375 51.125 67.5625 C54.91568759 68.17163408 54.91568759 68.17163408 58.3125 67.4375 C59.6428125 67.2209375 59.6428125 67.2209375 61 67 C61.66 67.66 62.32 68.32 63 69 C48.59756168 73.66206096 34.04835702 73.66193901 20.046875 67.75390625 C16.53954045 65.73494059 14.06981569 63.26176119 11.4375 60.25 C10.95861328 59.71141357 10.47972656 59.17282715 9.98632812 58.61791992 C-4.09187955 42.62586562 -4.36848464 25.5327831 -4 5 C-3.34 4.67 -2.68 4.34 -2 4 C-0.86649466 1.98330173 -0.86649466 1.98330173 0 0 Z ' fill='%23C868E4' transform='translate(33,248)'/%3E%3Cpath d='M0 0 C0.33 0 0.66 0 1 0 C1.33 3.63 1.66 7.26 2 11 C2.33 8.36 2.66 5.72 3 3 C3.66 3 4.32 3 5 3 C5.25523438 4.90072266 5.25523438 4.90072266 5.515625 6.83984375 C7.57627226 23.86016261 7.57627226 23.86016261 17.5390625 37.1875 C23.85445882 41.05735987 30.82830903 40.72044384 38 40 C40.52818858 39.35029791 42.83571589 38.58884116 45.23046875 37.55859375 C47 37 47 37 50 38 C47.73172355 39.48321908 45.46058097 40.96167699 43.1875 42.4375 C42.54490234 42.85837891 41.90230469 43.27925781 41.24023438 43.71289062 C38.51609896 45.47722704 36.09247829 46.9691739 33 48 C33 47.34 33 46.68 33 46 C31.87464844 46.08701172 31.87464844 46.08701172 30.7265625 46.17578125 C22.31953541 46.54636809 15.88145888 45.25778354 9.41015625 39.61328125 C-0.84568843 28.23521649 -0.2781547 14.32496702 0 0 Z ' fill='%23D459CB' transform='translate(83,259)'/%3E%3Cpath d='M0 0 C9.58480686 6.39930975 20.73710429 15.3953309 25.5625 26.05859375 C26.85302019 28.42902841 28.48225137 30.38175836 30.21728516 32.43994141 C36.83663105 40.30797161 42.61730284 48.70478187 48.3125 57.25 C48.71339844 57.84821564 49.11429687 58.44643127 49.52734375 59.06277466 C50.68303136 60.79059276 51.83124744 62.52310544 52.9765625 64.2578125 C53.64381348 65.26730957 54.31106445 66.27680664 54.99853516 67.31689453 C56.53781183 69.87612556 57.67806598 72.32130182 58.6875 75.125 C54.30075439 71.26998113 51.51401499 66.85690685 48.453125 61.90625 C46.45908216 58.76519137 44.28227684 55.8294599 42.015625 52.8828125 C40.86636612 51.36173458 39.79967015 49.77893539 38.75 48.1875 C36.37380591 44.6592118 33.7534666 41.38295874 31.078125 38.078125 C29.6875 36.125 29.6875 36.125 29.6875 34.125 C28.2025 33.63 28.2025 33.63 26.6875 33.125 C21.6875 27.65988372 21.6875 27.65988372 21.6875 25.125 C20.6975 24.795 19.7075 24.465 18.6875 24.125 C17.36328125 22.7421875 17.36328125 22.7421875 16 21 C8.33545908 11.74577652 -1.66959858 4.57020538 -12.3125 -0.875 C-13.116875 -1.2875 -13.92125 -1.7 -14.75 -2.125 C-23.01984905 -4.54544363 -29.30091437 -3.71419351 -37.3125 -0.875 C-38.64173428 -0.52567905 -39.97394815 -0.18671755 -41.3125 0.125 C-39.18778271 -2.19166995 -37.19622366 -3.62458578 -34.375 -5 C-33.70597656 -5.33257813 -33.03695312 -5.66515625 -32.34765625 -6.0078125 C-20.9491755 -10.86474672 -10.062517 -5.86475012 0 0 Z ' fill='%239BDBFC' transform='translate(201.3125,25.875)'/%3E%3Cpath d='M0 0 C0.72206635 -0.0033284 1.44413269 -0.0066568 2.18807983 -0.01008606 C3.70936447 -0.01513541 5.23066012 -0.017495 6.75195312 -0.01733398 C9.08481835 -0.0195302 11.41721776 -0.03773281 13.75 -0.05664062 C15.22916505 -0.05957297 16.70833234 -0.06155883 18.1875 -0.0625 C18.88646393 -0.06968552 19.58542786 -0.07687103 20.30557251 -0.08427429 C25.23209866 -0.06087009 25.23209866 -0.06087009 27.4609375 2.16796875 C26.26271362 2.20555298 26.26271362 2.20555298 25.0402832 2.24389648 C15.84654085 2.534725 6.65354946 2.84346908 -2.5390625 3.16796875 C-3.60833984 3.20535156 -4.67761719 3.24273437 -5.77929688 3.28125 C-15.57335165 3.63739745 -25.14546732 4.24980507 -34.84375 5.69921875 C-39.03538298 6.23092695 -43.1960856 6.46995676 -47.4140625 6.66796875 C-52.61662959 6.91257094 -57.47662676 7.44463472 -62.51953125 8.765625 C-64.83374862 9.22667798 -66.93128677 9.22437487 -69.2890625 9.16796875 C-75.4938365 9.02299739 -81.43882296 10.13683149 -87.5390625 11.16796875 C-94.04985542 12.22786527 -100.97295486 13.01651189 -107.5390625 12.16796875 C-108.1990625 11.17796875 -108.8590625 10.18796875 -109.5390625 9.16796875 C-107.62645697 7.25536322 -104.14765593 7.85314188 -101.6015625 7.73046875 C-95.57731843 7.40301238 -89.59592828 6.91395072 -83.6015625 6.23046875 C-82.85737061 6.14563232 -82.11317871 6.0607959 -81.34643555 5.97338867 C-77.52951741 5.53099654 -73.71548892 5.06747759 -69.90234375 4.59375 C-69.14880615 4.50150146 -68.39526855 4.40925293 -67.61889648 4.31420898 C-66.20246716 4.13995885 -64.78655217 3.96144566 -63.37133789 3.77758789 C-60.07097766 3.37042455 -56.84762843 3.13229989 -53.52734375 3.17578125 C-49.52760404 3.1679463 -45.80780392 2.73483319 -41.8515625 2.16796875 C-34.04622068 1.12896607 -26.3615961 1.01366516 -18.49536133 1.15429688 C-17.6473999 1.16783203 -16.79943848 1.18136719 -15.92578125 1.1953125 C-14.79982544 1.22226196 -14.79982544 1.22226196 -13.65112305 1.24975586 C-11.56773219 1.2485171 -11.56773219 1.2485171 -9.73608398 0.67675781 C-6.51029426 -0.07027472 -3.29362956 0.00527435 0 0 Z ' fill='%23E1E1E1' transform='translate(222.5390625,332.83203125)'/%3E%3Cpath d='M0 0 C-0.48859497 0.86274536 -0.48859497 0.86274536 -0.98706055 1.74291992 C-7.96281299 14.14060728 -14.40281156 26.63420237 -20.1875 39.625 C-20.46685394 40.25046722 -20.74620789 40.87593445 -21.0340271 41.52035522 C-23.6012058 47.28624105 -26.07414607 52.98415934 -28 59 C-28.99 58.67 -29.98 58.34 -31 58 C-31.56405424 51.50456288 -29.65378145 46.93067557 -27 41.0625 C-26.59281738 40.13953125 -26.18563477 39.2165625 -25.76611328 38.265625 C-22.38503372 30.67689229 -18.79534231 23.20482732 -14.95410156 15.83886719 C-13.98206091 13.96542547 -13.03331667 12.08132581 -12.0859375 10.1953125 C-11.47501472 9.00466571 -10.86308369 7.81453555 -10.25 6.625 C-9.71890625 5.58601562 -9.1878125 4.54703125 -8.640625 3.4765625 C-6.09771519 -0.3620204 -4.43468368 -1.47822789 0 0 Z ' fill='%23F89E3E' transform='translate(131,142)'/%3E%3Cpath d='M0 0 C0.99 0 1.98 0 3 0 C1.77615489 7.78839935 -0.588223 14.77828053 -3.5625 22.0625 C-4.00867676 23.16013672 -4.45485352 24.25777344 -4.91455078 25.38867188 C-15.22080469 50.31644435 -33.38682799 83.48256922 -58 97 C-57.44004079 93.18597848 -55.85011012 91.53085831 -53.09765625 88.91015625 C-52.29457031 88.132771 -51.49148438 87.35538574 -50.6640625 86.55444336 C-49.80554688 85.73210205 -48.94703125 84.90976074 -48.0625 84.0625 C-24.24755242 60.69077505 -8.86148959 32.04762013 0 0 Z ' fill='%23DFDFE2' transform='translate(361,232)'/%3E%3Cpath d='M0 0 C0.25523438 1.485 0.25523438 1.485 0.515625 3 C1.82308904 10.23915442 3.32883802 16.54381858 7 23 C7 23.66 7 24.32 7 25 C8.32258472 25.68774405 9.65986503 26.34711373 11 27 C11.9796875 27.515625 12.959375 28.03125 13.96875 28.5625 C18.84863281 30.64369203 23.71896284 30.32661343 28.9375 30.1875 C29.90751953 30.17396484 30.87753906 30.16042969 31.87695312 30.14648438 C34.25189129 30.11138677 36.62564378 30.06222275 39 30 C34.22295094 34.77704906 27.41323825 35.24969664 20.9375 35.4375 C13.14724824 35.23624484 8.22531783 33.54308167 2.75 28 C-3.39351773 20.14435438 -4.68598479 10.68000759 -4 1 C-2 0 -2 0 0 0 Z ' fill='%23490560' transform='translate(93,265)'/%3E%3Cpath d='M0 0 C1.1132744 4.4530976 0.69723913 5.7858577 -0.6953125 10.0390625 C-1.07953369 11.24804199 -1.46375488 12.45702148 -1.85961914 13.70263672 C-2.06652374 14.34263611 -2.27342834 14.9826355 -2.48660278 15.64202881 C-7.19087591 30.25430757 -10.49163914 44.84136519 -13 60 C-13.66 59.01 -14.32 58.02 -15 57 C-15.33 59.31 -15.66 61.62 -16 64 C-18.4750378 60.2874433 -18.05049823 56.97679109 -17.5 52.75 C-17.40960449 52.02200195 -17.31920898 51.29400391 -17.22607422 50.54394531 C-15.12820896 35.45557315 -10.79414665 20.43884169 -6 6 C-5.67 7.32 -5.34 8.64 -5 10 C-3.35 6.7 -1.7 3.4 0 0 Z ' fill='%23F79859' transform='translate(48,192)'/%3E%3Cpath d='M0 0 C2.94488846 3.53109985 5.39072928 7.13331484 7.72265625 11.09375 C8.06493256 11.6739389 8.40720886 12.25412781 8.75985718 12.85189819 C9.86586297 14.73164853 10.96490442 16.61532797 12.0625 18.5 C12.43794952 19.1426178 12.81339905 19.7852356 13.20022583 20.44732666 C18.09869237 28.84138005 22.89786873 37.28002748 27.4375 45.875 C28.09987671 47.11926758 28.09987671 47.11926758 28.77563477 48.38867188 C31.09778125 52.86666589 32.80352818 57.09642697 34 62 C33.34 62 32.68 62 32 62 C31.505 62.99 31.505 62.99 31 64 C30.71769531 63.34 30.43539063 62.68 30.14453125 62 C22.43434819 44.63513024 13.2375826 27.26933328 2.37109375 11.66015625 C-1.03614132 6.67463791 -1.03614132 6.67463791 -0.8125 2.5 C-0.544375 1.675 -0.27625 0.85 0 0 Z ' fill='%23609DE5' transform='translate(247,158)'/%3E%3Cpath d='M0 0 C0.83273438 0.40476562 1.66546875 0.80953125 2.5234375 1.2265625 C13.95615414 7.64673671 24.14153889 18.61780334 32 29 C32.33 28.67 32.66 28.34 33 28 C35.5 30.3125 35.5 30.3125 38 33 C38 33.99 38 34.98 38 36 C39.20786728 38.82422613 40.77695036 41.21077025 42.6015625 43.671875 C43.09140625 44.33574219 43.58125 44.99960938 44.0859375 45.68359375 C44.59382813 46.36550781 45.10171875 47.04742187 45.625 47.75 C46.140625 48.44738281 46.65625 49.14476562 47.1875 49.86328125 C48.45559119 51.57755267 49.7274289 53.28905156 51 55 C50.01 55.99 50.01 55.99 49 57 C48.67950684 56.54375244 48.35901367 56.08750488 48.02880859 55.61743164 C41.81502768 46.80669914 35.47475118 38.14229669 28.625 29.8125 C28.06731934 29.13131104 27.50963867 28.45012207 26.93505859 27.74829102 C16.86425771 15.64152133 4.16351178 1.80387449 -12 -1 C-17.44957744 -1.43903245 -22.74057864 -1.58177306 -28 0.0625 C-31.11043894 1.03451217 -32.02213293 0.91774783 -35 0 C-24.10645014 -6.61288664 -11.11737204 -5.5418924 0 0 Z ' fill='%238364C8' transform='translate(168,62)'/%3E%3Cpath d='M0 0 C11.03566476 4.74361536 18.1647083 19.22474911 24.53417969 28.79833984 C25.76646404 30.64922929 27.00794354 32.4930043 28.2578125 34.33203125 C30.19902288 37.20455107 32.10612484 40.09605808 34 43 C34.43538086 43.66225586 34.87076172 44.32451172 35.31933594 45.00683594 C36.74546225 47.1846884 38.15558504 49.37219756 39.5625 51.5625 C40.01713623 52.25432373 40.47177246 52.94614746 40.94018555 53.65893555 C42.04025331 55.39092516 43.02998546 57.19195993 44 59 C43.67 59.99 43.34 60.98 43 62 C43.80300335 63.95516467 43.80300335 63.95516467 45.125 65.94140625 C45.58390625 66.68970703 46.0428125 67.43800781 46.515625 68.20898438 C47.25039063 69.37397461 47.25039063 69.37397461 48 70.5625 C48.96552089 72.10098131 49.92424394 73.64375698 50.875 75.19140625 C51.30554688 75.87404541 51.73609375 76.55668457 52.1796875 77.26000977 C52.58574219 78.12130493 52.58574219 78.12130493 53 79 C52.67 79.66 52.34 80.32 52 81 C49.11369651 76.39256062 46.23286889 71.78176557 43.35595703 67.16845703 C42.10622596 65.16987737 40.8491956 63.17611908 39.58984375 61.18359375 C38.87222226 60.03917132 38.1547647 58.89464608 37.4375 57.75 C36.79683594 56.73421875 36.15617187 55.7184375 35.49609375 54.671875 C34 52 34 52 33.52734375 50.04541016 C32.62498463 46.54542649 30.48647763 43.64669394 28.5625 40.625 C28.11511475 39.91746582 27.66772949 39.20993164 27.20678711 38.48095703 C20.57112471 28.08651896 13.33040823 18.2045724 5.57836914 8.61669922 C3.36925206 5.86311862 1.39761497 3.25580761 0 0 Z ' fill='%235C95E0' transform='translate(225,50)'/%3E%3Cpath d='M0 0 C0.99 1.485 0.99 1.485 2 3 C-18.86838943 19.9970451 -51.93395644 42 -80 42 C-80 41.01 -80 40.02 -80 39 C-79.1181604 38.77449463 -79.1181604 38.77449463 -78.21850586 38.54443359 C-55.38188365 32.65211742 -26.28702278 24.28702278 -9 7 C-7.65696166 5.96456962 -6.30156145 4.94507352 -4.9375 3.9375 C-2.36631852 2.08858942 -2.36631852 2.08858942 0 0 Z ' fill='%23DFDFE2' transform='translate(301,327)'/%3E%3Cpath d='M0 0 C0.495 0.99 0.495 0.99 1 2 C-2.97806279 2.50904763 -6.95759558 3.00557427 -10.9375 3.5 C-12.05447266 3.64308594 -13.17144531 3.78617187 -14.32226562 3.93359375 C-19.97277284 4.62955065 -25.44665861 5.09940405 -31.13842773 4.99023438 C-33.54366839 5.00285203 -35.73203468 5.42437906 -38.0625 6 C-41.17754665 6.68955367 -43.99660706 7.11794022 -47.1875 7.0625 C-50.94779607 7.0008558 -54.28757843 7.43369841 -58 8 C-64.69426621 8.7539965 -71.26462239 9.11041603 -78 9 C-75.29845703 6.29845703 -72.43552293 6.06109903 -68.8125 5.375 C-67.51957031 5.11460937 -66.22664062 4.85421875 -64.89453125 4.5859375 C-61.18202344 4.02738567 -57.74521008 3.96951573 -54 4 C-52.1385816 3.73408309 -50.28309719 3.4221683 -48.4375 3.0625 C-42.74902394 2.0527955 -37.1225833 1.57108588 -31.359375 1.21875 C-28.45432377 1.02958387 -25.58068346 0.75312001 -22.6875 0.4375 C-15.14762564 -0.28705249 -7.56557763 -0.07982438 0 0 Z ' fill='%23DFDFDF' transform='translate(218,323)'/%3E%3Cpath d='M0 0 C1.91920548 3.38976553 2.74564643 6.70227242 3.5625 10.5 C3.81128906 11.6240625 4.06007813 12.748125 4.31640625 13.90625 C6.34291874 24.94836059 6.23615358 36.24944357 6.25 47.4375 C6.25200409 48.22770538 6.25400818 49.01791077 6.256073 49.83206177 C6.26389017 62.44275058 5.44923702 74.60153073 3 87 C2.70416016 88.50240234 2.70416016 88.50240234 2.40234375 90.03515625 C2.26957031 90.68355469 2.13679688 91.33195312 2 92 C1.01 92 0.02 92 -1 92 C-0.87882812 91.2471875 -0.75765625 90.494375 -0.6328125 89.71875 C-0.27110127 87.4260573 0.07924488 85.1315593 0.421875 82.8359375 C0.78274973 80.44148489 1.16463828 78.04999264 1.578125 75.6640625 C4.74917321 55.14285054 3.9815234 33.58967434 0.36767578 13.20410156 C-1.37591362 2.75182724 -1.37591362 2.75182724 0 0 Z ' fill='%23DDDDE0' transform='translate(363,139)'/%3E%3Cpath d='M0 0 C4.06632186 1.52603383 6.17728737 4.37303677 8.6875 7.75 C9.12465332 8.33217285 9.56180664 8.9143457 10.01220703 9.51416016 C23.09226092 27.15119704 35.52463386 47.55706363 41 69 C40.67 69.66 40.34 70.32 40 71 C39.34 71 38.68 71 38 71 C37.5875 69.8140625 37.175 68.628125 36.75 67.40625 C32.88771235 56.49956686 28.49441556 46.1800489 23 36 C22.67386719 35.38785645 22.34773438 34.77571289 22.01171875 34.14501953 C16.52550383 23.91301014 10.16131805 14.6245236 2.4375 5.9375 C0 3 0 3 0 0 Z ' fill='%23DEDEE1' transform='translate(321,63)'/%3E%3Cpath d='M0 0 C2.5 1.5625 2.5 1.5625 4 4 C4.5625 7.5 4.5625 7.5 4 11 C1.28148463 14.21279089 -0.40723678 14.90640581 -4.5625 15.5625 C-8 15 -8 15 -10.4375 12.875 C-12.26836859 9.50620179 -12.64250722 7.77472994 -12 4 C-9.04487268 -0.67895159 -5.10946802 -1.01561147 0 0 Z ' fill='%23ECC23D' transform='translate(207,144)'/%3E%3Cpath d='M0 0 C2.875 1.5625 2.875 1.5625 5 4 C5.625 7.4375 5.625 7.4375 5 11 C2.52506641 14.42123173 1.11736219 15.79477021 -3.0625 16.5625 C-6 16 -6 16 -8.375 14.5 C-10.65416433 10.99359333 -10.81753559 8.07099353 -10 4 C-7.30203057 -0.15072221 -4.80768487 -0.78492814 0 0 Z ' fill='%23D79D2B' transform='translate(159,156)'/%3E%3Cpath d='M0 0 C0.33 0 0.66 0 1 0 C2.21336485 8.41442143 2.84483521 15.65288726 -2 23 C-6.72310152 28.02095477 -12.44306912 30.28681693 -19 32 C-19.61794434 32.17345947 -20.23588867 32.34691895 -20.87255859 32.52563477 C-23.02540217 33.00566404 -24.91495065 33.12923827 -27.1171875 33.1328125 C-28.27541016 33.13474609 -28.27541016 33.13474609 -29.45703125 33.13671875 C-30.25496094 33.13285156 -31.05289062 33.12898438 -31.875 33.125 C-33.06029297 33.13080078 -33.06029297 33.13080078 -34.26953125 33.13671875 C-38.6251962 33.12947139 -42.71160502 32.86871024 -47 32 C-47 31.67 -47 31.34 -47 31 C-45.73285156 30.95101562 -44.46570313 30.90203125 -43.16015625 30.8515625 C-41.46091904 30.77645809 -39.76170124 30.70091368 -38.0625 30.625 C-36.81629883 30.57859375 -36.81629883 30.57859375 -35.54492188 30.53125 C-27.9321615 30.17579037 -20.64418112 29.17426215 -13.75 25.75 C-12.96109375 25.37359375 -12.1721875 24.9971875 -11.359375 24.609375 C-4.9500601 20.23745821 -3.11883842 15.43659887 -1.6875 8.125 C-1.51927734 7.34125 -1.35105469 6.5575 -1.17773438 5.75 C-0.76939314 3.83662964 -0.38246026 1.91871125 0 0 Z ' fill='%23590D96' transform='translate(316,199)'/%3E%3Cpath d='M0 0 C4.05927869 1.3530929 5.0474531 3.96355937 7.0625 7.5 C7.45171631 8.16636475 7.84093262 8.83272949 8.24194336 9.51928711 C9.07367471 10.9442374 9.90177033 12.37131492 10.7265625 13.80029297 C11.9823466 15.96950591 13.25365772 18.12872637 14.53125 20.28515625 C16.62690955 23.82243913 18.7068817 27.36857174 20.78027344 30.91894531 C21.99402942 32.9898132 23.21908715 35.05368479 24.4453125 37.1171875 C25.19313348 38.39037538 25.94054995 39.66380097 26.6875 40.9375 C27.68330078 42.62166016 27.68330078 42.62166016 28.69921875 44.33984375 C29.12847656 45.21769531 29.55773437 46.09554687 30 47 C29.67 47.66 29.34 48.32 29 49 C28.34 48.67 27.68 48.34 27 48 C26.67 48.66 26.34 49.32 26 50 C22.84689682 45.49254378 20.33408644 40.883057 17.9375 35.9375 C15.29050995 30.49576346 15.29050995 30.49576346 12.328125 25.22265625 C11 23 11 23 9.8125 19.5 C8.13346228 14.73664298 5.41863005 10.60965202 2.69262695 6.39257812 C0 2.19275747 0 2.19275747 0 0 Z ' fill='%23477BD6' transform='translate(267,110)'/%3E%3Cpath d='M0 0 C9.86409498 8.17822243 9.86409498 8.17822243 11.15234375 12.04296875 C7.62752181 10.5334778 5.33124213 8.44855729 2.58984375 5.79296875 C-7.27389569 -3.22821269 -17.46463904 -7.56229387 -30.7734375 -7.26171875 C-40.00412939 -6.34685983 -46.99278454 -1.85491122 -54.4140625 3.43359375 C-56.84765625 5.04296875 -56.84765625 5.04296875 -58.84765625 5.04296875 C-57.47793741 0.93381224 -54.67924234 -0.28316156 -51.16015625 -2.45703125 C-50.54720703 -2.84761719 -49.93425781 -3.23820312 -49.30273438 -3.640625 C-32.36565931 -14.30936582 -15.68433282 -12.44334765 0 0 Z ' fill='%23803DB7' transform='translate(177.84765625,63.95703125)'/%3E%3Cpath d='M0 0 C0 0.66 0 1.32 0 2 C0.82910889 1.97905273 1.65821777 1.95810547 2.51245117 1.93652344 C35.87348701 1.20752217 35.87348701 1.20752217 52 6 C52.495 6.99 52.495 6.99 53 8 C48.03448912 7.54858992 43.23865431 6.85532759 38.35131836 5.85571289 C24.62615566 3.12407542 10.85334347 3.28874551 -3 5 C-4.11375 5.103125 -5.2275 5.20625 -6.375 5.3125 C-10.70200443 6.13313877 -14.56347493 7.62538997 -18.64453125 9.2578125 C-21 10 -21 10 -23 9 C-22.67 8.34 -22.34 7.68 -22 7 C-22.66 6.67 -23.32 6.34 -24 6 C-21.31707555 4.98598131 -18.62974283 3.98871449 -15.9375 3 C-15.18533203 2.71382812 -14.43316406 2.42765625 -13.65820312 2.1328125 C-8.87663136 0.39405913 -5.0863079 -0.3242268 0 0 Z ' fill='%23B24ABA' transform='translate(182,213)'/%3E%3Cpath d='M0 0 C0.33 0 0.66 0 1 0 C1.73322136 9.48299624 0.60865212 16.31272717 -5.46875 23.8125 C-11.21669324 29.44773847 -19.78745697 32.22171388 -27.75 32.25 C-28.8225 32.1675 -29.895 32.085 -31 32 C-31 30.68 -31 29.36 -31 28 C-25.06 26.68 -19.12 25.36 -13 24 C-13 23.34 -13 22.68 -13 22 C-12.2575 21.773125 -11.515 21.54625 -10.75 21.3125 C-6.25950723 19.16931027 -3.94589136 15.46363652 -2 11 C-1.56901247 9.09514151 -1.19607236 7.17643418 -0.875 5.25 C-0.70742188 4.26515625 -0.53984375 3.2803125 -0.3671875 2.265625 C-0.24601562 1.51796875 -0.12484375 0.7703125 0 0 Z ' fill='%232B1283' transform='translate(313,192)'/%3E%3Cpath d='M0 0 C0.66 0.33 1.32 0.66 2 1 C-5.28096748 8.94287362 -13.81694658 12.44917267 -24.56787109 13.17285156 C-27.46337539 13.29222278 -30.35218819 13.34904299 -33.25 13.375 C-34.18465088 13.38885742 -35.11930176 13.40271484 -36.08227539 13.41699219 C-42.06649065 13.37655471 -46.52513591 12.428989 -52 10 C-52 9.67 -52 9.34 -52 9 C-44.82242235 7.98797712 -38.18808741 8.11173825 -31 9 C-30.67 8.34 -30.34 7.68 -30 7 C-30 7.66 -30 8.32 -30 9 C-26.83010489 8.8066364 -23.66579347 8.56371816 -20.5 8.3125 C-19.613125 8.25900391 -18.72625 8.20550781 -17.8125 8.15039062 C-10.45225245 7.52801675 -5.24594655 5.24594655 0 0 Z ' fill='%23D184E9' transform='translate(309,215)'/%3E%3Cpath d='M0 0 C0.33 0.99 0.66 1.98 1 3 C1.99 2.67 2.98 2.34 4 2 C3.32351043 5.94296777 1.37520301 9.10320002 -0.625 12.5 C-1.15480469 13.41289795 -1.15480469 13.41289795 -1.6953125 14.34423828 C-2.79232878 16.23218371 -3.89595071 18.1161608 -5 20 C-5.69577508 21.1950433 -6.39110379 22.39034661 -7.0859375 23.5859375 C-8.71961558 26.39319657 -10.35767974 29.19779106 -12 32 C-12.99 31.67 -13.98 31.34 -15 31 C-14.17668314 21.88176575 -9.98129349 15.49575139 -5 8 C-3.99446209 6.39929884 -2.993416 4.79575226 -2 3.1875 C-1.34 2.135625 -0.68 1.08375 0 0 Z ' fill='%23D76742' transform='translate(86,111)'/%3E%3Cpath d='M0 0 C5.70577424 8.55866136 4.22682937 21.06991411 4 31 C3.67 31 3.34 31 3 31 C2.67 26.38 2.34 21.76 2 17 C1.505 17.86625 1.01 18.7325 0.5 19.625 C-4.49505687 26.95338793 -12.16723465 30.97158883 -20.76367188 32.70410156 C-29.07019636 33.80317445 -37.64689485 33.27832979 -46 33 C-46.33 32.34 -46.66 31.68 -47 31 C-46.35039307 30.98018066 -45.70078613 30.96036133 -45.03149414 30.93994141 C-42.04147478 30.84372067 -39.05206352 30.73444101 -36.0625 30.625 C-35.04091797 30.5940625 -34.01933594 30.563125 -32.96679688 30.53125 C-22.48341035 30.12933103 -13.34693963 28.86070398 -5 22 C-1.33258932 16.89457829 0.135872 11.54911982 0.0625 5.3125 C0.05347656 4.31863281 0.04445313 3.32476562 0.03515625 2.30078125 C0.02355469 1.54152344 0.01195312 0.78226563 0 0 Z ' fill='%23582FAD' transform='translate(317,201)'/%3E%3Cpath d='M0 0 C1.57524807 2.36287211 2.54376952 4.2508932 3.625 6.8125 C5.96429719 11.59702483 9.47585329 14.31523942 14 17 C21.72159703 19.57386568 30.81679336 18.74803345 38.23046875 15.55859375 C40 15 40 15 43 16 C35.0811337 21.44673291 28.55770013 22.5926078 19 22 C12.2324986 20.64649972 6.30284413 17.48983561 2 12 C-1.4137931 4.24137931 -1.4137931 4.24137931 0 0 Z ' fill='%23BF30CC' transform='translate(90,281)'/%3E%3Cpath d='M0 0 C0.66 1.32 1.32 2.64 2 4 C0.0682203 6.94129904 -1.87140152 9.87734417 -3.8125 12.8125 C-4.63331055 14.06256836 -4.63331055 14.06256836 -5.47070312 15.33789062 C-6.00244141 16.14033203 -6.53417969 16.94277344 -7.08203125 17.76953125 C-7.56905518 18.50792236 -8.0560791 19.24631348 -8.55786133 20.00708008 C-9.93323317 21.9077336 -11.18599551 23.51083914 -13 25 C-13.99 25 -14.98 25 -16 25 C-16.32084916 20.85321908 -15.60591124 18.79604705 -13.26171875 15.390625 C-12.68873047 14.55402344 -12.11574219 13.71742187 -11.52539062 12.85546875 C-10.91888672 11.99566406 -10.31238281 11.13585937 -9.6875 10.25 C-8.79514648 8.93708984 -8.79514648 8.93708984 -7.88476562 7.59765625 C-3.39977679 1.13325893 -3.39977679 1.13325893 0 0 Z ' fill='%23B24757' transform='translate(103,89)'/%3E%3Cpath d='M0 0 C4.40338499 1.47434765 5.92674045 4.75481485 8 8.625 C8.52001587 9.57451538 8.52001587 9.57451538 9.05053711 10.54321289 C9.73374696 11.79616552 10.41220248 13.05172445 11.08544922 14.31005859 C11.84212283 15.70826861 12.63695277 17.08575418 13.44140625 18.45703125 C16.12188202 23.19222712 16.27632948 25.89468206 15 31 C10.69426719 25.85589553 7.77791739 20.29921649 4.6875 14.375 C4.12482422 13.32570312 3.56214844 12.27640625 2.98242188 11.1953125 C2.45583984 10.18984375 1.92925781 9.184375 1.38671875 8.1484375 C0.90420654 7.23239746 0.42169434 6.31635742 -0.07543945 5.37255859 C-1 3 -1 3 0 0 Z ' fill='%233A52C2' transform='translate(294,158)'/%3E%3Cpath d='M0 0 C0.33 0 0.66 0 1 0 C1.05893685 3.9374352 1.09390669 7.87475427 1.125 11.8125 C1.14175781 12.91271484 1.15851562 14.01292969 1.17578125 15.14648438 C1.21813455 22.32536862 0.56258545 28.99126695 -1 36 C-4.58285497 29.26656238 -4.13212252 22.00139817 -4.0625 14.5625 C-4.05798828 13.64017578 -4.05347656 12.71785156 -4.04882812 11.76757812 C-4.03713938 9.51164952 -4.02075455 7.25586033 -4 5 C-3.34 4.67 -2.68 4.34 -2 4 C-0.86649466 1.98330173 -0.86649466 1.98330173 0 0 Z ' fill='%23EC74A6' transform='translate(33,248)'/%3E%3Cpath d='M0 0 C-1.92212996 3.65413958 -3.86520819 7.29671566 -5.8125 10.9375 C-6.63331055 12.49887695 -6.63331055 12.49887695 -7.47070312 14.09179688 C-8.00244141 15.08115234 -8.53417969 16.07050781 -9.08203125 17.08984375 C-9.56905518 18.00628662 -10.0560791 18.92272949 -10.55786133 19.86694336 C-12 22 -12 22 -15 23 C-15.66 22.67 -16.32 22.34 -17 22 C-15.52518091 17.1042088 -13.50326356 12.7501344 -11.125 8.25 C-10.61646484 7.24259766 -10.61646484 7.24259766 -10.09765625 6.21484375 C-8.65588505 3.47931588 -7.44911201 1.32878389 -4.9296875 -0.515625 C-3 -1 -3 -1 0 0 Z ' fill='%23DE6D32' transform='translate(131,142)'/%3E%3Cpath d='M0 0 C15.70587889 0.27079102 27.21737971 10.72454999 38 21 C38.64727051 21.61359375 39.29454102 22.2271875 39.96142578 22.859375 C40.59419434 23.47296875 41.22696289 24.0865625 41.87890625 24.71875 C42.45326416 25.27498047 43.02762207 25.83121094 43.61938477 26.40429688 C45 28 45 28 46 31 C43 31 43 31 41.45703125 29.49609375 C40.91433594 28.81675781 40.37164062 28.13742188 39.8125 27.4375 C29.61647818 15.32573295 15.56654971 4.7224358 0 1 C0 0.67 0 0.34 0 0 Z ' fill='%2364C2F4' transform='translate(180,19)'/%3E%3Cpath d='M0 0 C1.63606066 4.90818197 2.62435018 8.1846666 0.41796875 13.015625 C-0.30916386 14.43557907 -1.05318083 15.84699402 -1.8125 17.25 C-2.18181641 17.96929687 -2.55113281 18.68859375 -2.93164062 19.4296875 C-4.4449898 22.33140549 -5.67078957 24.67078957 -8 27 C-8 26.01 -8 25.02 -8 24 C-8.99 24 -9.98 24 -11 24 C-10.41584531 20.38606692 -9.44519602 17.57523816 -7.71484375 14.35546875 C-7.04291992 13.09379883 -7.04291992 13.09379883 -6.35742188 11.80664062 C-5.88884766 10.94232422 -5.42027344 10.07800781 -4.9375 9.1875 C-4.46505859 8.30384766 -3.99261719 7.42019531 -3.50585938 6.50976562 C-2.34296716 4.33668422 -1.17421625 2.16697716 0 0 Z ' fill='%23DE733B' transform='translate(71,136)'/%3E%3Cpath d='M0 0 C0.33 0 0.66 0 1 0 C1.24856408 6.58694802 0.31547023 12.55597352 -1 19 C-1.19078125 19.96550781 -1.3815625 20.93101562 -1.578125 21.92578125 C-2.04535342 24.28528478 -2.51943436 26.64318339 -3 29 C-3.66 28.01 -4.32 27.02 -5 26 C-5.33 28.31 -5.66 30.62 -6 33 C-8.81485868 29.05079528 -7.86390658 25.01988717 -7.25 20.5 C-7.11851563 19.36111328 -7.11851563 19.36111328 -6.984375 18.19921875 C-6.51107709 14.44570337 -6.05089108 11.26752138 -4 8 C-3.67 8.33 -3.34 8.66 -3 9 C-2.01 6.03 -1.02 3.06 0 0 Z ' fill='%23F57380' transform='translate(38,223)'/%3E%3Cpath d='M0 0 C19.61629969 -0.93708438 38.29876503 2.01258638 57 8 C53.78069203 9.03235582 51.55786843 8.93158763 48.26171875 8.2578125 C47.35873047 8.07863281 46.45574219 7.89945313 45.52539062 7.71484375 C44.58888672 7.52019531 43.65238281 7.32554687 42.6875 7.125 C33.80190958 5.32930577 25.12260986 3.91107901 16.0625 3.4375 C15.28326172 3.39431641 14.50402344 3.35113281 13.70117188 3.30664062 C11.80092883 3.20171923 9.90048331 3.1004755 8 3 C8 2.34 8 1.68 8 1 C5.36 1 2.72 1 0 1 C0 0.67 0 0.34 0 0 Z ' fill='%236A1593' transform='translate(188,216)'/%3E%3Cpath d='M0 0 C0.33 0 0.66 0 1 0 C1.25523438 1.32451172 1.25523438 1.32451172 1.515625 2.67578125 C3.89589977 14.4632058 6.79158989 24.26864635 14 34 C11 34 11 34 9.09765625 32.3125 C3.57945562 26.04229889 -1.65964312 19.67910045 -2 11 C-1.48156386 7.29908458 -0.78642669 3.65265949 0 0 Z ' fill='%23CA62DC' transform='translate(33,273)'/%3E%3Cpath d='M0 0 C5.91448194 3.27184107 9.07672268 7.75023193 12.875 13.25 C13.46796875 14.09046875 14.0609375 14.9309375 14.671875 15.796875 C16.12414354 17.85815937 17.56636978 19.92573022 19 22 C18.67 22.66 18.34 23.32 18 24 C19.406575 27.49325221 21.59494153 30.59213128 23.625 33.75 C24.25664062 34.73484375 24.88828125 35.7196875 25.5390625 36.734375 C26.02117187 37.48203125 26.50328125 38.2296875 27 39 C26.34 39.66 25.68 40.32 25 41 C23.17827825 38.25600644 21.36929013 35.5038437 19.5625 32.75 C19.04623047 31.97269531 18.52996094 31.19539063 17.99804688 30.39453125 C17.50498047 29.64042969 17.01191406 28.88632813 16.50390625 28.109375 C16.04830322 27.41811523 15.5927002 26.72685547 15.12329102 26.01464844 C13.99243816 23.98643766 13.55082457 22.23917897 13 20 C11.42443551 17.60559375 9.82486777 15.30180394 8.125 13 C7.67769531 12.38382813 7.23039063 11.76765625 6.76953125 11.1328125 C4.94139913 8.61980492 3.10203966 6.12962978 1.1796875 3.6875 C0 2 0 2 0 0 Z ' fill='%237775D0' transform='translate(204,96)'/%3E%3Cpath d='M0 0 C9.40963855 5.40963855 9.40963855 5.40963855 13 9 C12.67 9.99 12.34 10.98 12 12 C11.49210937 11.61328125 10.98421875 11.2265625 10.4609375 10.828125 C8.31667471 9.20587375 6.1585566 7.60316156 4 6 C3.05125 5.278125 2.1025 4.55625 1.125 3.8125 C-7.12041711 -0.96984193 -16.79830192 -2.62910944 -26.17578125 -0.5078125 C-26.77777344 -0.31960937 -27.37976563 -0.13140625 -28 0.0625 C-31.11043894 1.03451217 -32.02213293 0.91774783 -35 0 C-24.17145506 -6.57342565 -11.04177005 -5.62689907 0 0 Z ' fill='%237C33AC' transform='translate(168,62)'/%3E%3Cpath d='M0 0 C0.495 0.99 0.495 0.99 1 2 C-5.74233066 3.65601104 -12.45378265 4.62367529 -19.33984375 5.4921875 C-22.43653123 5.92182397 -25.44690074 6.46310672 -28.5 7.125 C-32.4689434 7.95186321 -35.95141958 8.42172713 -40 8 C-40.66 7.01 -41.32 6.02 -42 5 C-40.08739447 3.08739447 -36.60859343 3.68517313 -34.0625 3.5625 C-27.82895476 3.22659027 -21.64048887 2.70243243 -15.4375 2 C-14.33257202 1.87540405 -14.33257202 1.87540405 -13.20532227 1.74829102 C-8.79177609 1.23781945 -4.395577 0.64691803 0 0 Z ' fill='%23DDDDDD' transform='translate(155,337)'/%3E%3Cpath d='M0 0 C4.89229195 0.53370458 6.86760896 3.99087974 9.79907227 7.59887695 C17.91803418 17.75085606 25.16066461 28.59334862 32.3125 39.4375 C32.79904053 40.16541748 33.28558105 40.89333496 33.78686523 41.64331055 C34.92175542 43.38899015 35.97040674 45.19021805 37 47 C36.505 47.99 36.505 47.99 36 49 C31.23054805 42.59530738 26.71202981 36.12559741 22.54296875 29.3125 C21.16656948 27.24964338 19.77958148 25.70396187 18 24 C17.5875 23.29875 17.175 22.5975 16.75 21.875 C14.5926733 18.33082042 12.03814074 15.20640525 9.42578125 11.98828125 C8 10 8 10 8 8 C7.01 7.67 6.02 7.34 5 7 C3.61328125 5.37109375 3.61328125 5.37109375 2.3125 3.4375 C1.87550781 2.79683594 1.43851563 2.15617187 0.98828125 1.49609375 C0.49908203 0.75552734 0.49908203 0.75552734 0 0 Z ' fill='%238BC4F2' transform='translate(223,52)'/%3E%3Cpath d='M0 0 C0.33 0 0.66 0 1 0 C0.51358785 6.84817102 -0.35993952 13.33042073 -2 20 C-1.34 20 -0.68 20 0 20 C0 22.31 0 24.62 0 27 C0.66 27.33 1.32 27.66 2 28 C0.35 28.66 -1.3 29.32 -3 30 C-2.95875 31.2375 -2.9175 32.475 -2.875 33.75 C-2.7638784 37.08364791 -3.34123921 39.1004339 -5 42 C-5.58457767 28.84700249 -6.02203499 12.04406998 0 0 Z ' fill='%23F07DA2' transform='translate(89,232)'/%3E%3Cpath d='M0 0 C0.33 0 0.66 0 1 0 C0.49561035 5.29609136 -0.23696281 10.34180094 -1.45703125 15.515625 C-2.50409472 20.30650533 -3.22989684 25.15818122 -4 30 C-4.66 30 -5.32 30 -6 30 C-5.33333333 24 -4.66666667 18 -4 12 C-5.65 20.25 -7.3 28.5 -9 37 C-9.88750062 33.44999752 -10.06587932 32.12960009 -9.51171875 28.734375 C-9.31739258 27.52201172 -9.31739258 27.52201172 -9.11914062 26.28515625 C-8.97669922 25.44855469 -8.83425781 24.61195313 -8.6875 23.75 C-8.55666016 22.92886719 -8.42582031 22.10773438 -8.29101562 21.26171875 C-7.44341771 16.09423772 -6.33574432 11.06299592 -5 6 C-4.01 6 -3.02 6 -2 6 C-1.34 4.02 -0.68 2.04 0 0 Z ' fill='%23F6706C' transform='translate(93,222)'/%3E%3Cpath d='M0 0 C0.66 0.33 1.32 0.66 2 1 C1.34 1.66 0.68 2.32 0 3 C0.33 3.66 0.66 4.32 1 5 C0.23816406 5.47308594 -0.52367188 5.94617188 -1.30859375 6.43359375 C-7.67700659 10.51224018 -12.92594119 14.53312547 -18.0625 20.1171875 C-19.96042491 21.96154195 -21.57963486 22.97350586 -24 24 C-21.80556482 17.01770625 -15.86126477 12.91872929 -10.4375 8.375 C-9.59155273 7.65957031 -9.59155273 7.65957031 -8.72851562 6.9296875 C-5.88021875 4.53112171 -3.0099366 2.19305894 0 0 Z ' fill='%23672270' transform='translate(125,67)'/%3E%3Cpath d='M0 0 C1.19689453 -0.01224609 2.39378906 -0.02449219 3.62695312 -0.03710938 C4.77228516 -0.03904297 5.91761719 -0.04097656 7.09765625 -0.04296875 C8.14574463 -0.04707764 9.19383301 -0.05118652 10.27368164 -0.05541992 C12.9375 0.1875 12.9375 0.1875 15.9375 2.1875 C13.6275 2.5175 11.3175 2.8475 8.9375 3.1875 C8.9375 3.5175 8.9375 3.8475 8.9375 4.1875 C1.3475 4.1875 -6.2425 4.1875 -14.0625 4.1875 C-14.0625 3.5275 -14.0625 2.8675 -14.0625 2.1875 C-15.0525 1.8575 -16.0425 1.5275 -17.0625 1.1875 C-11.53052089 -0.47715828 -5.72171758 0.00309115 0 0 Z ' fill='%23BD60C4' transform='translate(196.0625,210.8125)'/%3E%3Cpath d='M0 0 C8.14471551 3.43319847 13.5387109 12.49327996 18.625 19.4375 C19.07504395 20.04045898 19.52508789 20.64341797 19.98876953 21.26464844 C21.2265625 22.99609375 21.2265625 22.99609375 23 26 C22.67 26.99 22.34 27.98 22 29 C18.16251266 25.447111 15.20341403 21.3863947 12.125 17.1875 C8.62512457 12.4210456 5.07433441 7.8202473 1.09716797 3.4387207 C0 2 0 2 0 0 Z ' fill='%2356A3E9' transform='translate(225,50)'/%3E%3Cpath d='M0 0 C3.40517714 1.13505905 3.62023775 1.5528188 5.296875 4.52734375 C5.69777344 5.23697266 6.09867187 5.94660156 6.51171875 6.67773438 C6.92035156 7.42345703 7.32898438 8.16917969 7.75 8.9375 C8.17410156 9.67935547 8.59820312 10.42121094 9.03515625 11.18554688 C11.33069396 15.3092897 11.33069396 15.3092897 12 17 C11.67 17.66 11.34 18.32 11 19 C10.34 18.67 9.68 18.34 9 18 C8.67 18.66 8.34 19.32 8 20 C-0.75 7.5 -0.75 7.5 0 0 Z ' fill='%234566CA' transform='translate(285,140)'/%3E%3Cpath d='M0 0 C-1.47761759 5.50651736 -5.3617737 8.76842828 -9.3125 12.625 C-9.97701172 13.29273438 -10.64152344 13.96046875 -11.32617188 14.6484375 C-14.66738686 17.95329901 -17.77897762 20.82825541 -22 23 C-21.45007108 19.04411418 -19.59746667 17.22353001 -16.81640625 14.453125 C-15.97142578 13.60878906 -15.12644531 12.76445312 -14.25585938 11.89453125 C-13.36705078 11.02183594 -12.47824219 10.14914062 -11.5625 9.25 C-10.67755859 8.36183594 -9.79261719 7.47367187 -8.88085938 6.55859375 C-2.26685508 0 -2.26685508 0 0 0 Z ' fill='%23DADADD' transform='translate(325,306)'/%3E%3Cpath d='M0 0 C-0.99 0.495 -0.99 0.495 -2 1 C-2.22889676 2.99467179 -2.45469744 4.98988838 -2.6484375 6.98828125 C-3.10290897 9.588868 -4.19012898 11.11143894 -6 13 C-7.32 12.67 -8.64 12.34 -10 12 C-10.48372093 4.74418605 -10.48372093 4.74418605 -8.375 1.5 C-5.39901677 -0.37956836 -3.45669582 -0.31424507 0 0 Z ' fill='%23EEC63E' transform='translate(159,156)'/%3E%3Cpath d='M0 0 C0.97030151 0.17958252 0.97030151 0.17958252 1.96020508 0.36279297 C9.19096713 1.69056422 16.43441746 2.92577631 23.6875 4.125 C25.33008789 4.39763672 25.33008789 4.39763672 27.00585938 4.67578125 C29.67044909 5.11794024 32.3351629 5.55933492 35 6 C35 6.33 35 6.66 35 7 C22.71543888 7.55980279 11.88614981 6.11403223 0 3 C0 2.01 0 1.02 0 0 Z ' fill='%23DEDEE0' transform='translate(131,363)'/%3E%3Cpath d='M0 0 C1.75570312 0.01353516 1.75570312 0.01353516 3.546875 0.02734375 C4.43890625 0.03894531 5.3309375 0.05054688 6.25 0.0625 C2.77739043 3.53510957 -2.30533177 4.0058355 -7.109375 4.1171875 C-8.74219689 4.07983537 -10.37500905 4.04205586 -12.0078125 4.00390625 C-16.2964708 4.09554425 -20.45127351 4.84586339 -24.67578125 5.55078125 C-28.35858275 6.16380158 -32.0427314 6.62635075 -35.75 7.0625 C-35.42 6.4025 -35.09 5.7425 -34.75 5.0625 C-27.97555793 3.19368839 -21.06583546 2.38585993 -14.10546875 1.52734375 C-10.94757498 1.16342578 -10.94757498 1.16342578 -8.72265625 0.5078125 C-5.80718905 -0.15033257 -2.98199537 -0.02981995 0 0 Z ' fill='%23E5E5E5' transform='translate(162.75,337.9375)'/%3E%3Cpath d='M0 0 C0.66 0.33 1.32 0.66 2 1 C0 3 0 3 -2.28515625 3.8515625 C-5.5421811 5.22935431 -7.75147625 7.08140241 -10.4375 9.375 C-14.17778492 12.51380667 -17.85583457 15.42389717 -22 18 C-20.64577602 14.08316756 -18.91699064 11.36047116 -16.1875 8.25 C-15.52105469 7.47140625 -14.85460937 6.6928125 -14.16796875 5.890625 C-11.6980756 3.73670016 -10.20408712 3.39530945 -7 3 C-4.59137834 2.10376869 -2.29754486 1.14877243 0 0 Z ' fill='%238C56BC' transform='translate(129,64)'/%3E%3Cpath d='M0 0 C9.47723538 -0.60172923 17.90281921 1.63599942 27 4 C27 4.33 27 4.66 27 5 C25.35 5.33 23.7 5.66 22 6 C22 6.33 22 6.66 22 7 C17.71802737 7.31331507 14.8233923 6.6931892 10.9453125 4.8671875 C7.40414838 3.28859627 3.68939423 2.17960224 0 1 C0 0.67 0 0.34 0 0 Z ' fill='%23CB79E0' transform='translate(237,219)'/%3E%3Cpath d='M0 0 C0.33 0.66 0.66 1.32 1 2 C1.99 2 2.98 2 4 2 C3.40895235 6.84659077 2.02055843 10.60748167 0 15 C-0.66 14.34 -1.32 13.68 -2 13 C-3.32 14.32 -4.64 15.64 -6 17 C-5.57664615 10.50857435 -3.08900201 5.66507011 0 0 Z ' fill='%23EC8B34' transform='translate(59,158)'/%3E%3Cpath d='M0 0 C0.66 0.33 1.32 0.66 2 1 C-4.29768195 7.87019849 -11.40593635 11.62826878 -20.80200195 12.15795898 C-23.87048792 12.196032 -26.93171762 12.17492199 -30 12.125 C-31.06089844 12.11597656 -32.12179687 12.10695312 -33.21484375 12.09765625 C-35.81013638 12.07427524 -38.40494465 12.04150556 -41 12 C-41 11.67 -41 11.34 -41 11 C-39.93523437 10.96261719 -38.87046875 10.92523438 -37.7734375 10.88671875 C-17.21284959 10.17649891 -17.21284959 10.17649891 0 0 Z ' fill='%23DFA7F3' transform='translate(309,215)'/%3E%3Cpath d='M0 0 C2 1.0625 2 1.0625 4 3 C4.5625 6.4375 4.5625 6.4375 4 10 C1.6875 12.5 1.6875 12.5 -1 14 C-1.99 13.67 -2.98 13.34 -4 13 C-3.52343588 11.20763933 -3.04366502 9.41613103 -2.5625 7.625 C-2.29566406 6.62726563 -2.02882812 5.62953125 -1.75390625 4.6015625 C-1 2 -1 2 0 0 Z ' fill='%23E39B1E' transform='translate(207,145)'/%3E%3Cpath d='M0 0 C0.33 0.99 0.66 1.98 1 3 C1.99 2.67 2.98 2.34 4 2 C3.35304087 6.04349453 1.64087654 9.87372871 -1 13 C-4.25 13.9375 -4.25 13.9375 -7 14 C-6.34097701 10.42959697 -4.83770842 7.82267745 -2.9375 4.75 C-2.38964844 3.85796875 -1.84179688 2.9659375 -1.27734375 2.046875 C-0.64505859 1.03367187 -0.64505859 1.03367187 0 0 Z ' fill='%23C95146' transform='translate(86,111)'/%3E%3Cpath d='M0 0 C1.47906892 -0.02689216 2.95827483 -0.04634621 4.4375 -0.0625 C5.26121094 -0.07410156 6.08492188 -0.08570313 6.93359375 -0.09765625 C9 0 9 0 10 1 C11.58736053 1.09924514 13.17907251 1.13079908 14.76953125 1.1328125 C15.74083984 1.13410156 16.71214844 1.13539063 17.71289062 1.13671875 C18.73576172 1.13285156 19.75863281 1.12898437 20.8125 1.125 C21.82376953 1.12886719 22.83503906 1.13273438 23.87695312 1.13671875 C25.3397168 1.13478516 25.3397168 1.13478516 26.83203125 1.1328125 C28.17358276 1.13112061 28.17358276 1.13112061 29.54223633 1.12939453 C31.84381345 1.00822279 33.7870998 0.60834617 36 0 C37.41534778 -0.06456879 38.83337689 -0.08611039 40.25 -0.0625 C42.10625 -0.0315625 42.10625 -0.0315625 44 0 C39.76216387 4.23783613 34.13139813 3.16053347 28.51171875 3.18554688 C27.49150635 3.18542603 27.49150635 3.18542603 26.45068359 3.18530273 C24.40310277 3.18747025 22.35607794 3.20558255 20.30859375 3.22460938 C13.21034208 3.23507877 6.84674166 2.91194883 0 1 C0 0.67 0 0.34 0 0 Z ' fill='%23B54FDB' transform='translate(255,226)'/%3E%3Cpath d='M0 0 C5.8022175 -0.36263859 9.63999211 0.74315457 15 3 C15 3.33 15 3.66 15 4 C13.02 4 11.04 4 9 4 C10.39025391 4.39832031 10.39025391 4.39832031 11.80859375 4.8046875 C13.60490234 5.33449219 13.60490234 5.33449219 15.4375 5.875 C17.22994141 6.39707031 17.22994141 6.39707031 19.05859375 6.9296875 C22 8 22 8 23 10 C20.03636867 9.4372094 17.08088893 8.8510457 14.125 8.25 C13.28324219 8.09273437 12.44148437 7.93546875 11.57421875 7.7734375 C10.76855469 7.60585937 9.96289062 7.43828125 9.1328125 7.265625 C8.38918457 7.11899414 7.64555664 6.97236328 6.87939453 6.82128906 C4.37736937 5.72791252 4.10453195 4.4319437 3 2 C2.01 1.34 1.02 0.68 0 0 Z ' fill='%23BB5BD1' transform='translate(230,216)'/%3E%3Cpath d='M0 0 C5.70577424 8.55866136 4.22682937 21.06991411 4 31 C3.67 31 3.34 31 3 31 C2.67 26.38 2.34 21.76 2 17 C0.68 18.98 -0.64 20.96 -2 23 C-3.30325042 19.07298716 -2.26939835 17.13726922 -0.703125 13.37109375 C0.59258761 9.00166289 0.22394163 4.51200913 0 0 Z ' fill='%23604DBF' transform='translate(317,201)'/%3E%3Cpath d='M0 0 C0.33 0 0.66 0 1 0 C2.19148936 21.53191489 2.19148936 21.53191489 2 32 C-1.8330026 25.61166233 -1.15625674 17.8244681 -1.125 10.625 C-1.12886719 9.71105469 -1.13273437 8.79710937 -1.13671875 7.85546875 C-1.13542969 6.98792969 -1.13414063 6.12039063 -1.1328125 5.2265625 C-1.13168457 4.43846191 -1.13055664 3.65036133 -1.12939453 2.83837891 C-1 1 -1 1 0 0 Z ' fill='%23DE60A2' transform='translate(30,252)'/%3E%3Cpath d='M0 0 C3.93286799 0.11917782 5.73546048 1.48241886 8.375 4.1875 C8.96667969 4.81914063 9.55835938 5.45078125 10.16796875 6.1015625 C11.91778515 7.91480508 13.73085366 9.47874772 15.6875 11.0625 C18.86647358 13.7188045 20.8859684 16.44842691 23 20 C18.42081422 18.78786259 16.52383557 16.46997047 13.67578125 12.9375 C11.30191452 10.19288951 8.59507819 7.9249803 5.8359375 5.578125 C3.7854109 3.81554469 1.87227771 1.95028928 0 0 Z ' fill='%2392D1F7' transform='translate(202,32)'/%3E%3Cpath d='M0 0 C0.33 0 0.66 0 1 0 C1 2.31 1 4.62 1 7 C0.34 7 -0.32 7 -1 7 C-4.63 15.25 -8.26 23.5 -12 32 C-13.19825825 28.40522526 -12.74682581 27.76105508 -11.26953125 24.39453125 C-10.87830078 23.49283203 -10.48707031 22.59113281 -10.08398438 21.66210938 C-9.66439453 20.72173828 -9.24480469 19.78136719 -8.8125 18.8125 C-8.41224609 17.89146484 -8.01199219 16.97042969 -7.59960938 16.02148438 C-5.22327252 10.59480913 -2.69622794 5.27468961 0 0 Z ' fill='%23EC7F2B' transform='translate(113,164)'/%3E%3Cpath d='M0 0 C2.64 0 5.28 0 8 0 C7.71617054 1.75128818 7.42260471 3.50100003 7.125 5.25 C6.96257812 6.22453125 6.80015625 7.1990625 6.6328125 8.203125 C6.05144152 10.77264117 5.29159735 12.72071056 4 15 C2.35 14.67 0.7 14.34 -1 14 C-0.34 13.67 0.32 13.34 1 13 C1.91280138 10.42562419 1.91280138 10.42562419 2.625 7.4375 C2.88539063 6.42558594 3.14578125 5.41367188 3.4140625 4.37109375 C3.60742188 3.58863281 3.80078125 2.80617187 4 2 C2.68 1.34 1.36 0.68 0 0 Z ' fill='%23E7B02E' transform='translate(199,144)'/%3E%3Cpath d='M0 0 C6.34347376 3.33032373 10.53250677 8.79547531 14 15 C14.2265625 17.84765625 14.2265625 17.84765625 14 20 C10.37949627 16.6332699 7.59591293 12.88740631 4.75 8.875 C4.29109375 8.24207031 3.8321875 7.60914062 3.359375 6.95703125 C0 2.24790737 0 2.24790737 0 0 Z ' fill='%238775CF' transform='translate(204,96)'/%3E%3Cpath d='M0 0 C7.4727727 3.40426312 12.89510174 9.74649963 18 16 C17.34 16.66 16.68 17.32 16 18 C15.5153125 17.43152344 15.030625 16.86304687 14.53125 16.27734375 C10.44955048 11.57553988 6.30131976 7.34126588 1.46875 3.41015625 C0.9840625 2.94480469 0.499375 2.47945312 0 2 C0 1.34 0 0.68 0 0 Z ' fill='%2361BAF2' transform='translate(208,33)'/%3E%3Cpath d='M0 0 C1.19625 0.185625 2.3925 0.37125 3.625 0.5625 C6.53012524 0.94366891 8.419693 0.93005117 11.375 0.4375 C12.24125 0.293125 13.1075 0.14875 14 0 C14.66 0.66 15.32 1.32 16 2 C8.17683695 4.29370226 1.15475474 5.433422 -7 5 C-6.67 4.34 -6.34 3.68 -6 3 C-2.9375 2.375 -2.9375 2.375 0 2 C0 1.34 0 0.68 0 0 Z ' fill='%23C65BD7' transform='translate(80,315)'/%3E%3Cpath d='M0 0 C0.99 0.33 1.98 0.66 3 1 C2.24163557 2.65161581 1.46787924 4.29617138 0.6875 5.9375 C0.04361328 7.31228516 0.04361328 7.31228516 -0.61328125 8.71484375 C-2 11 -2 11 -5 12 C-5.66 11.67 -6.32 11.34 -7 11 C-5.125 5.25 -5.125 5.25 -4 3 C-3.01 3 -2.02 3 -1 3 C-0.67 2.01 -0.34 1.02 0 0 Z ' fill='%23E77D31' transform='translate(121,153)'/%3E%3Cpath d='M0 0 C-4.89387158 4.89387158 -11.76035503 5.22348304 -18.375 5.3125 C-24.56157635 5.29228243 -24.56157635 5.29228243 -28 3 C-22.72 3 -17.44 3 -12 3 C-14.31 2.67 -16.62 2.34 -19 2 C-19 1.67 -19 1.34 -19 1 C-12.63849395 0.34513908 -6.39628979 -0.12068471 0 0 Z ' fill='%235C0F6F' transform='translate(132,295)'/%3E%3Cpath d='M0 0 C0.66 0 1.32 0 2 0 C1.34580901 5.06998019 -0.8546409 9.41990777 -3 14 C-3.33 13.01 -3.66 12.02 -4 11 C-4.99 11 -5.98 11 -7 11 C-6.4739075 7.21213403 -5.61896089 4.82847776 -3 2 C-2.34 2 -1.68 2 -1 2 C-0.67 1.34 -0.34 0.68 0 0 Z ' fill='%23E57F41' transform='translate(67,149)'/%3E%3Cpath d='M0 0 C0.33 0 0.66 0 1 0 C1.50643553 2.22771342 2.0048962 4.45724076 2.5 6.6875 C2.7784375 7.92886719 3.056875 9.17023438 3.34375 10.44921875 C3.89354126 13.42398218 4.13795705 15.99368602 4 19 C3.34 19.33 2.68 19.66 2 20 C1.34 19.01 0.68 18.02 0 17 C-0.38929687 16.41734375 -0.77859375 15.8346875 -1.1796875 15.234375 C-2.36151063 12.01531391 -1.72711662 9.59509231 -1.125 6.25 C-0.92132813 5.07953125 -0.71765625 3.9090625 -0.5078125 2.703125 C-0.34023438 1.81109375 -0.17265625 0.9190625 0 0 Z ' fill='%23D867C9' transform='translate(33,273)'/%3E%3Cpath d='M0 0 C0.66 0 1.32 0 2 0 C2.33923576 2.35344806 2.67150534 4.7075484 3 7.0625 C3.09539062 7.71927734 3.19078125 8.37605469 3.2890625 9.05273438 C3.88887674 13.40138763 4.09127093 17.61329071 4 22 C3.34 22 2.68 22 2 22 C-0.3479743 14.66258031 -0.19355213 7.65606218 0 0 Z ' fill='%23D341A9' transform='translate(86,262)'/%3E%3Cpath d='M0 0 C1.85625 0.0309375 1.85625 0.0309375 3.75 0.0625 C3.42 1.0525 3.09 2.0425 2.75 3.0625 C1.91597656 3.17207031 1.08195312 3.28164063 0.22265625 3.39453125 C-6.59817557 4.35554192 -12.7952318 5.65563728 -19.25 8.0625 C-17.12528271 5.74583005 -15.13372366 4.31291422 -12.3125 2.9375 C-11.64347656 2.60492187 -10.97445312 2.27234375 -10.28515625 1.9296875 C-6.798694 0.44409322 -3.78036573 -0.0630061 0 0 Z ' fill='%23B2E2F8' transform='translate(179.25,17.9375)'/%3E%3Cpath d='M0 0 C3.59592007 1.44723361 5.08632782 3.15933257 7.1640625 6.39453125 C8.01097656 7.70454102 8.01097656 7.70454102 8.875 9.04101562 C9.4525 9.95560547 10.03 10.87019531 10.625 11.8125 C11.21023437 12.71548828 11.79546875 13.61847656 12.3984375 14.54882812 C15.00935426 18.6238943 17.30649406 22.44914458 19 27 C14.61733715 23.14856901 11.83007081 18.74279534 8.77734375 13.79296875 C6.74380523 10.59740821 4.51471131 7.62284422 2.1640625 4.65625 C1 3 1 3 0 0 Z ' fill='%237FB1EA' transform='translate(241,74)'/%3E%3Cpath d='M0 0 C0.82242188 0.09990234 1.64484375 0.19980469 2.4921875 0.30273438 C4.49586299 0.54736917 6.49810383 0.80370787 8.5 1.0625 C8.5 1.3925 8.5 1.7225 8.5 2.0625 C-0.68180367 3.17389151 -9.3224273 2.8774484 -18.5 2.0625 C-18.17 1.4025 -17.84 0.7425 -17.5 0.0625 C-11.46055686 -1.12770557 -6.06714316 -0.79544792 0 0 Z ' fill='%23E6E6E9' transform='translate(194.5,0.9375)'/%3E%3Cpath d='M0 0 C4.72067039 4.23649907 4.72067039 4.23649907 5.9375 7.5625 C6 10 6 10 4 14 C2.02 10.04 0.04 6.08 -2 2 C-1.34 1.34 -0.68 0.68 0 0 Z ' fill='%233244BB' transform='translate(304,175)'/%3E%3Cpath d='M0 0 C1.32 0.99 2.64 1.98 4 3 C3.6875 4.875 3.6875 4.875 3 7 C2.01 7.66 1.02 8.32 0 9 C-1.32 8.34 -2.64 7.68 -4 7 C-5.32 7.99 -6.64 8.98 -8 10 C-5 4 -5 4 -1 2 C-0.67 1.34 -0.34 0.68 0 0 Z ' fill='%23641B63' transform='translate(177,71)'/%3E%3Cpath d='M0 0 C0.33 0 0.66 0 1 0 C1.08333357 4.8333472 0.95261487 9.23692563 0 14 C-0.66 14 -1.32 14 -2 14 C-2.33 16.31 -2.66 18.62 -3 21 C-3.33 21 -3.66 21 -4 21 C-4.40566938 13.96839747 -3.07523451 7.72031901 -1 1 C-0.67 0.67 -0.34 0.34 0 0 Z ' fill='%23F98473' transform='translate(38,223)'/%3E%3Cpath d='M0 0 C0.33 0.66 0.66 1.32 1 2 C5.95 1.67 10.9 1.34 16 1 C11.38350391 5.61649609 2.48491686 4.11937035 -3.59765625 4.1328125 C-6.81916643 4.00705895 -9.83733306 3.60653887 -13 3 C-13 2.67 -13 2.34 -13 2 C-8.71 2 -4.42 2 0 2 C0 1.34 0 0.68 0 0 Z ' fill='%23BD6AE2' transform='translate(278,222)'/%3E%3Cpath d='M0 0 C0.33 0 0.66 0 1 0 C1.58150213 13.11610364 1.58150213 13.11610364 -2 19 C-4.62180089 20.88441939 -5.73343924 21 -9 21 C-7.76302083 19.56770833 -6.52604167 18.13541667 -5.2890625 16.703125 C-2.54474655 13.0773015 -1.61891503 9.71349015 -0.875 5.25 C-0.62363281 3.77273437 -0.62363281 3.77273437 -0.3671875 2.265625 C-0.24601562 1.51796875 -0.12484375 0.7703125 0 0 Z ' fill='%23332193' transform='translate(313,192)'/%3E%3Cpath d='M0 0 C4.31661412 2.15830706 5.27654049 3.62506431 7 8 C8.80245176 10.62974115 10.71047205 13.1552918 12.63671875 15.6953125 C13.08660156 16.45585937 13.53648437 17.21640625 14 18 C13.67 18.99 13.34 19.98 13 21 C12.01 21 11.02 21 10 21 C9.92910156 20.14921875 9.85820312 19.2984375 9.78515625 18.421875 C8.84555338 14.32688936 6.91192308 11.54670456 4.4375 8.25 C0 2.23008346 0 2.23008346 0 0 Z ' fill='%238181D5' transform='translate(220,118)'/%3E%3Cpath d='M0 0 C1.98073365 0.280828 3.95958448 0.57496614 5.9375 0.875 C7.59072266 1.11863281 7.59072266 1.11863281 9.27734375 1.3671875 C10.17582031 1.57601562 11.07429687 1.78484375 12 2 C12.33 2.66 12.66 3.32 13 4 C13.99 4.66 14.98 5.32 16 6 C9.74892565 5.57045059 3.95795479 4.98598493 -2 3 C-1.34 2.67 -0.68 2.34 0 2 C0 1.34 0 0.68 0 0 Z ' fill='%23CA7AD8' transform='translate(220,213)'/%3E%3Cpath d='M0 0 C0.66 1.32 1.32 2.64 2 4 C0.35 6.31 -1.3 8.62 -3 11 C-3.99 10.01 -4.98 9.02 -6 8 C-5.83927789 5.42844624 -5.23062119 4.27072922 -3.5625 2.3125 C-2 1 -2 1 0 0 Z ' fill='%23A23D61' transform='translate(103,89)'/%3E%3Cpath d='M0 0 C2.75131831 5.3192154 2.99224094 8.19390847 1.75 14.125 C1.37101562 16.01605469 1.37101562 16.01605469 0.984375 17.9453125 C0.65953125 18.95335937 0.3346875 19.96140625 0 21 C-0.99 21.33 -1.98 21.66 -3 22 C-2.54177532 18.53058454 -2.10868317 15.32604951 -1 12 C-0.77674186 9.94106379 -0.59294241 7.87766347 -0.4375 5.8125 C-0.35371094 4.72582031 -0.26992188 3.63914063 -0.18359375 2.51953125 C-0.12300781 1.68808594 -0.06242187 0.85664063 0 0 Z ' fill='%23D7A5F1' transform='translate(314,192)'/%3E%3Cpath d='M0 0 C0 3 0 3 -2.4375 5.5 C-6.89693169 9.01445688 -12.32617494 11 -18 11 C-18 10.34 -18 9.68 -18 9 C-17.28714844 8.76925781 -16.57429688 8.53851563 -15.83984375 8.30078125 C-9.76540915 6.23236678 -5.01309006 4.01047205 0 0 Z ' fill='%235336B4' transform='translate(313,222)'/%3E%3Cpath d='M0 0 C1.5625 1.0625 1.5625 1.0625 3 3 C2.76811536 6.30435606 2.48929359 9.02141281 1 12 C-1.5625 12.625 -1.5625 12.625 -4 13 C-3.52343588 11.20763933 -3.04366502 9.41613103 -2.5625 7.625 C-2.29566406 6.62726563 -2.02882813 5.62953125 -1.75390625 4.6015625 C-1 2 -1 2 0 0 Z ' fill='%23F78948' transform='translate(99,196)'/%3E%3Cpath d='M0 0 C0.33 0.66 0.66 1.32 1 2 C0.22265625 3.7265625 0.22265625 3.7265625 -0.9375 5.625 C-1.618125 6.73875 -2.29875 7.8525 -3 9 C-4.65 9 -6.3 9 -8 9 C-7.40107045 5.64599451 -6.32893158 3.50144503 -4 1 C-1.8125 0.25 -1.8125 0.25 0 0 Z ' fill='%23D05B42' transform='translate(83,123)'/%3E%3Cpath d='M0 0 C0.66 0.99 1.32 1.98 2 3 C-1.96 5.97 -5.92 8.94 -10 12 C-10.99 11.34 -11.98 10.68 -13 10 C-10.96678062 8.47394321 -8.93237612 6.94956438 -6.89453125 5.4296875 C-6.20746094 4.91664063 -5.52039063 4.40359375 -4.8125 3.875 C-4.11769531 3.35679687 -3.42289062 2.83859375 -2.70703125 2.3046875 C-1.06593783 1.11007661 -1.06593783 1.11007661 0 0 Z ' fill='%23DADADD' transform='translate(301,327)'/%3E%3Cpath d='M0 0 C4.91935902 4.11619836 9.52647956 8.40410362 14 13 C13.34 13.66 12.68 14.32 12 15 C11.30132812 14.28972656 10.60265625 13.57945313 9.8828125 12.84765625 C8.97273437 11.92855469 8.06265625 11.00945312 7.125 10.0625 C6.22007812 9.14597656 5.31515625 8.22945312 4.3828125 7.28515625 C2.22317745 4.98812373 2.22317745 4.98812373 0 4 C0 2.68 0 1.36 0 0 Z ' fill='%238655BF' transform='translate(181,72)'/%3E%3Cpath d='M0 0 C3.88397689 1.55002747 6.02979619 4.00476621 8.75 7.125 C9.94882813 8.49011719 9.94882813 8.49011719 11.171875 9.8828125 C12.07679688 10.93082031 12.07679688 10.93082031 13 12 C12.01 12.66 11.02 13.32 10 14 C8.51551984 12.23361856 7.03758035 10.46173862 5.5625 8.6875 C4.73878906 7.70136719 3.91507813 6.71523438 3.06640625 5.69921875 C1 3 1 3 0 0 Z ' fill='%235AAEEE' transform='translate(225,50)'/%3E%3Cpath d='M0 0 C0 3.63320695 -0.73946263 4.25506176 -3 7 C-3.61875 7.845625 -4.2375 8.69125 -4.875 9.5625 C-7.06041491 12.06929946 -9.07655364 13.45706998 -12 15 C-11.58685438 10.55073948 -8.49538473 8.15899896 -5.4375 5.25 C-4.91736328 4.74339844 -4.39722656 4.23679687 -3.86132812 3.71484375 C-2.58089916 2.46965595 -1.29132446 1.23388498 0 0 Z ' fill='%23CECED1' transform='translate(315,314)'/%3E%3Cpath d='M0 0 C0.99 0 1.98 0 3 0 C2.88541307 1.43836751 2.75790884 2.87570966 2.625 4.3125 C2.55539063 5.11300781 2.48578125 5.91351563 2.4140625 6.73828125 C2 9 2 9 0 12 C0 12.66 0 13.32 0 14 C-0.99 14 -1.98 14 -3 14 C-2.01 9.38 -1.02 4.76 0 0 Z ' fill='%23EAB02C' transform='translate(157,157)'/%3E%3Cpath d='M0 0 C0.33 0.66 0.66 1.32 1 2 C-7.36005884 4.38858824 -15.38735156 4.190218 -24 4 C-20.23302796 1.57697371 -16.33962735 1.5986637 -12 1.4375 C-5.92398208 1.25024618 -5.92398208 1.25024618 0 0 Z ' fill='%23D6D6D6' transform='translate(155,337)'/%3E%3Cpath d='M0 0 C0.99 0.66 1.98 1.32 3 2 C3.66 1.67 4.32 1.34 5 1 C4.67 2.98 4.34 4.96 4 7 C3.34 6.34 2.68 5.68 2 5 C0.515 10.445 0.515 10.445 -1 16 C-1.33 16 -1.66 16 -2 16 C-2.2358396 10.22192976 -1.86783046 5.48675196 0 0 Z ' fill='%23F57D62' transform='translate(36,219)'/%3E%3Cpath d='M0 0 C1.32 0.66 2.64 1.32 4 2 C2.35 5.63 0.7 9.26 -1 13 C-1.66 13 -2.32 13 -3 13 C-3 11.02 -3 9.04 -3 7 C-2.34 6.67 -1.68 6.34 -1 6 C-0.34227572 2.97065509 -0.34227572 2.97065509 0 0 Z ' fill='%23F19032' transform='translate(114,164)'/%3E%3Cpath d='M0 0 C1.3058334 3.92128522 0.38030356 5.97831091 -1.40039062 9.68359375 C-1.74263672 10.36550781 -2.08488281 11.04742187 -2.4375 11.75 C-2.77587891 12.44738281 -3.11425781 13.14476562 -3.46289062 13.86328125 C-4.29806458 15.58068121 -5.14765424 17.29105738 -6 19 C-6.66 18.67 -7.32 18.34 -8 18 C-6.85718854 15.18623705 -5.71091259 12.37397584 -4.5625 9.5625 C-4.23701172 8.76005859 -3.91152344 7.95761719 -3.57617188 7.13085938 C-3.10727539 5.98520508 -3.10727539 5.98520508 -2.62890625 4.81640625 C-2.34088135 4.10943604 -2.05285645 3.40246582 -1.75610352 2.67407227 C-1 1 -1 1 0 0 Z ' fill='%23F8932F' transform='translate(110,178)'/%3E%3Cpath d='M0 0 C5.08938811 1.59043379 8.87456643 4.7446951 13 8 C12.67 8.99 12.34 9.98 12 11 C9.33333333 9 6.66666667 7 4 5 C3.25234375 4.48050781 2.5046875 3.96101563 1.734375 3.42578125 C0.87585938 2.72001953 0.87585938 2.72001953 0 2 C0 1.34 0 0.68 0 0 Z ' fill='%237D3BB0' transform='translate(168,63)'/%3E%3Cpath d='M0 0 C1.70840281 1.63412443 2.93453047 2.86906094 4 5 C4.66 4.34 5.32 3.68 6 3 C8.26881841 6.08559304 9.05451946 7.42209376 8.6875 11.3125 C8.460625 12.199375 8.23375 13.08625 8 14 C5.50447597 11.72402354 3.93377014 9.39278822 2.3125 6.4375 C1.87550781 5.65246094 1.43851562 4.86742187 0.98828125 4.05859375 C0 2 0 2 0 0 Z ' fill='%23567AD2' transform='translate(278,131)'/%3E%3Cpath d='M0 0 C-0.33 0.66 -0.66 1.32 -1 2 C-3.16467461 2.62669199 -5.35864524 3.15427374 -7.5625 3.625 C-8.76003906 3.88539062 -9.95757812 4.14578125 -11.19140625 4.4140625 C-12.11824219 4.60742188 -13.04507813 4.80078125 -14 5 C-14 4.01 -14 3.02 -14 2 C-12.42085985 1.46658816 -10.83645613 0.94874237 -9.25 0.4375 C-8.36828125 0.14746094 -7.4865625 -0.14257812 -6.578125 -0.44140625 C-3.92165684 -1.01697435 -2.52968894 -0.89248371 0 0 Z ' fill='%23DFDFE2' transform='translate(150,5)'/%3E%3Cpath d='M0 0 C4.02920351 1.34306784 4.8706069 3.39014203 6.9921875 6.921875 C8.19764322 9.40754338 8.42632348 11.27152974 8 14 C5.50447597 11.72402354 3.93377014 9.39278822 2.3125 6.4375 C1.87550781 5.65246094 1.43851562 4.86742188 0.98828125 4.05859375 C0 2 0 2 0 0 Z ' fill='%234270D0' transform='translate(275,123)'/%3E%3Cpath d='M0 0 C0.99 0 1.98 0 3 0 C2.35334574 3.491933 1.13457576 6.15389899 -1 9 C-2.32 9 -3.64 9 -5 9 C-4.625 7.0625 -4.625 7.0625 -4 5 C-3.34 4.67 -2.68 4.34 -2 4 C-0.86649466 1.98330173 -0.86649466 1.98330173 0 0 Z ' fill='%23BD4149' transform='translate(92,105)'/%3E%3Cpath d='M0 0 C0.66 0.33 1.32 0.66 2 1 C1.67 1.33 1.34 1.66 1 2 C1.66 2.66 2.32 3.32 3 4 C1.5682384 4.69937202 0.12932968 5.38412718 -1.3125 6.0625 C-2.51326172 6.63677734 -2.51326172 6.63677734 -3.73828125 7.22265625 C-6 8 -6 8 -9 7 C-6.03 4.69 -3.06 2.38 0 0 Z ' fill='%23521365' transform='translate(133,63)'/%3E%3Cpath d='M0 0 C3.49844386 0.63389235 5.84086876 2.05177694 8.75 4.0625 C9.94882813 4.88427734 9.94882813 4.88427734 11.171875 5.72265625 C12.07679687 6.35494141 12.07679687 6.35494141 13 7 C12.01 7.66 11.02 8.32 10 9 C8.3278148 7.88321917 6.66237197 6.75633648 5 5.625 C3.6078125 4.68527344 3.6078125 4.68527344 2.1875 3.7265625 C1.465625 3.15679687 0.74375 2.58703125 0 2 C0 1.34 0 0.68 0 0 Z ' fill='%23D6D6D9' transform='translate(69,332)'/%3E%3Cpath d='M0 0 C0.556875 0.721875 1.11375 1.44375 1.6875 2.1875 C6.00337641 7.43653887 10.04293183 10.84625803 16 14 C13 15 13 15 11.09765625 14.1796875 C6.11436635 10.98502565 1.85141237 8.19279641 0.25 2.1875 C0.1675 1.465625 0.085 0.74375 0 0 Z ' fill='%23C436D2' transform='translate(88,289)'/%3E%3Cpath d='M0 0 C0.66 0.33 1.32 0.66 2 1 C0.66958425 9.35010941 0.66958425 9.35010941 -2.125 12.0625 C-2.74375 12.371875 -3.3625 12.68125 -4 13 C-3.71517632 11.58194169 -3.42181856 10.16559621 -3.125 8.75 C-2.96257813 7.96109375 -2.80015625 7.1721875 -2.6328125 6.359375 C-2.00849925 4.03168856 -1.15161458 2.10968048 0 0 Z ' fill='%23F99066' transform='translate(42,209)'/%3E%3Cpath d='M0 0 C4.54075781 4.14010271 7.71842138 8.82390176 11 14 C10.01 14 9.02 14 8 14 C5.95703125 11.69921875 5.95703125 11.69921875 3.8125 8.6875 C3.09707031 7.70136719 2.38164062 6.71523437 1.64453125 5.69921875 C0 3 0 3 0 0 Z ' fill='%237D6CCC' transform='translate(208,104)'/%3E%3Cpath d='M0 0 C0.99 0.33 1.98 0.66 3 1 C1.61811547 4.21043882 0.07578097 6.04936365 -2.625 8.25 C-3.25664063 8.77078125 -3.88828125 9.2915625 -4.5390625 9.828125 C-5.02117187 10.21484375 -5.50328125 10.6015625 -6 11 C-6 7.39426104 -5.18292538 6.58663434 -3 3.8125 C-2.443125 3.09707031 -1.88625 2.38164063 -1.3125 1.64453125 C-0.879375 1.10183594 -0.44625 0.55914062 0 0 Z ' fill='%23976EC7' transform='translate(114,71)'/%3E%3Cpath d='M0 0 C0.66 0.33 1.32 0.66 2 1 C1.34 1.66 0.68 2.32 0 3 C0.33 3.66 0.66 4.32 1 5 C-0.28524261 5.86380259 -1.57842419 6.71580369 -2.875 7.5625 C-3.59429687 8.03816406 -4.31359375 8.51382813 -5.0546875 9.00390625 C-5.69664063 9.33261719 -6.33859375 9.66132812 -7 10 C-7.66 9.67 -8.32 9.34 -9 9 C-6.21000549 5.51250686 -3.74764169 2.49842779 0 0 Z ' fill='%235E1C72' transform='translate(125,67)'/%3E%3Cpath d='M0 0 C0.66 0.33 1.32 0.66 2 1 C-1.66717359 5.00055301 -5.06746451 7.66825595 -10 10 C-12.21484375 9.6015625 -12.21484375 9.6015625 -14 9 C-13.24074219 8.60167969 -12.48148437 8.20335937 -11.69921875 7.79296875 C-10.70535156 7.26316406 -9.71148437 6.73335937 -8.6875 6.1875 C-7.70136719 5.66542969 -6.71523438 5.14335937 -5.69921875 4.60546875 C-3.38334932 3.2280124 -1.76388999 2.00469409 0 0 Z ' fill='%23E3AFF9' transform='translate(309,215)'/%3E%3Cpath d='M0 0 C1.46373047 0.16628906 1.46373047 0.16628906 2.95703125 0.3359375 C3.69308594 0.43132813 4.42914063 0.52671875 5.1875 0.625 C5.1875 0.955 5.1875 1.285 5.1875 1.625 C4.16269531 1.75777344 3.13789063 1.89054687 2.08203125 2.02734375 C0.7213426 2.20564088 -0.63933385 2.38403123 -2 2.5625 C-2.67353516 2.64951172 -3.34707031 2.73652344 -4.04101562 2.82617188 C-7.66331166 3.30325477 -11.24053585 3.85512035 -14.8125 4.625 C-9.98017529 0.68755023 -6.24023132 -0.7518351 0 0 Z ' fill='%2370309D' transform='translate(147.8125,58.375)'/%3E%3Cpath d='M0 0 C0.33 0 0.66 0 1 0 C0.44210432 7.01524148 -0.18447923 14.00982196 -1 21 C-1.33 21 -1.66 21 -2 21 C-2.05404449 18.24973583 -2.09369306 15.50053797 -2.125 12.75 C-2.14175781 11.97269531 -2.15851563 11.19539062 -2.17578125 10.39453125 C-2.23662606 3.27568856 -2.23662606 3.27568856 0 0 Z ' fill='%23E2E2E4' transform='translate(2,153)'/%3E%3Cpath d='M0 0 C0.33 0 0.66 0 1 0 C1.3125 3.25 1.3125 3.25 1 7 C-1.3125 9.5 -1.3125 9.5 -4 11 C-4.99 10.67 -5.98 10.34 -7 10 C-6.57847656 9.52949219 -6.15695313 9.05898437 -5.72265625 8.57421875 C-5.17480469 7.95160156 -4.62695312 7.32898438 -4.0625 6.6875 C-3.51722656 6.07261719 -2.97195312 5.45773438 -2.41015625 4.82421875 C-0.79918441 2.94758042 -0.79918441 2.94758042 0 0 Z ' fill='%23CB861F' transform='translate(210,148)'/%3E%3Cpath d='M0 0 C6.81987029 0.43300764 11.91643021 1.90787824 18 5 C17.01 5.66 16.02 6.32 15 7 C14.50371094 6.73445313 14.00742188 6.46890625 13.49609375 6.1953125 C9.05021478 3.88379288 4.86099676 2.21524919 0 1 C0 0.67 0 0.34 0 0 Z ' fill='%236DCAF6' transform='translate(180,19)'/%3E%3Cpath d='M0 0 C0.99 0 1.98 0 3 0 C2.55005243 1.79379098 2.08975857 3.58498928 1.625 5.375 C1.36976562 6.37273437 1.11453125 7.37046875 0.8515625 8.3984375 C0 11 0 11 -2 13 C-2.19294408 8.17639811 -1.75747614 4.50353262 0 0 Z ' fill='%23F58855' transform='translate(39,208)'/%3E%3Cpath d='M0 0 C2.94721162 2.74395564 5.19168608 5.38337216 7 9 C6.67 9.66 6.34 10.32 6 11 C5.34 11 4.68 11 4 11 C2.35 7.7 0.7 4.4 -1 1 C-0.67 0.67 -0.34 0.34 0 0 Z ' fill='%234E88DB' transform='translate(262,100)'/%3E%3Cpath d='M0 0 C0.66 0 1.32 0 2 0 C2 2.31 2 4.62 2 7 C2.66 7.33 3.32 7.66 4 8 C2.35 8.66 0.7 9.32 -1 10 C-1.125 2.25 -1.125 2.25 0 0 Z ' fill='%23E66595' transform='translate(87,252)'/%3E%3Cpath d='M0 0 C0.99 0 1.98 0 3 0 C3 1.32 3 2.64 3 4 C3.66 4.33 4.32 4.66 5 5 C3.35 5.33 1.7 5.66 0 6 C0 7.65 0 9.3 0 11 C-0.33 11 -0.66 11 -1 11 C-1.02688151 9.35425434 -1.04634123 7.70838587 -1.0625 6.0625 C-1.07410156 5.14597656 -1.08570312 4.22945313 -1.09765625 3.28515625 C-1 1 -1 1 0 0 Z ' fill='%237A2076' transform='translate(89,260)'/%3E%3Cpath d='M0 0 C0 0.33 0 0.66 0 1 C-1.65 1.33 -3.3 1.66 -5 2 C-5 2.66 -5 3.32 -5 4 C-7.16874252 3.49396008 -8.99967627 3.00016187 -11 2 C-11.33 2.66 -11.66 3.32 -12 4 C-12.66 3.34 -13.32 2.68 -14 2 C-4.58997722 -1.62870159 -4.58997722 -1.62870159 0 0 Z ' fill='%23BB62BC' transform='translate(180,214)'/%3E%3Cpath d='M0 0 C3.60571107 0.59283087 5.54429438 2.02741777 8.25 4.4375 C8.95640625 5.05496094 9.6628125 5.67242187 10.390625 6.30859375 C12 8 12 8 12 10 C8.78727751 8.56006357 6.3793336 6.76981628 3.75 4.4375 C3.04359375 3.81746094 2.3371875 3.19742188 1.609375 2.55859375 C1.07828125 2.04425781 0.5471875 1.52992187 0 1 C0 0.67 0 0.34 0 0 Z ' fill='%237F4FBF' transform='translate(177,66)'/%3E%3Cpath d='M0 0 C0.99 0 1.98 0 3 0 C2.34 3.3 1.68 6.6 1 10 C0.01 10 -0.98 10 -2 10 C-1.34 6.7 -0.68 3.4 0 0 Z ' fill='%23DBDBDE' transform='translate(361,232)'/%3E%3Cpath d='M0 0 C0 0.66 0 1.32 0 2 C-5.38490641 2.91657981 -10.54230189 3.11138159 -16 3 C-11.97348633 -1.02651367 -5.39525069 -0.11010716 0 0 Z ' fill='%23D6D6D6' transform='translate(156,329)'/%3E%3Cpath d='M0 0 C0.99 0.33 1.98 0.66 3 1 C2.34 2.32 1.68 3.64 1 5 C-1.64 5 -4.28 5 -7 5 C-6.67 4.34 -6.34 3.68 -6 3 C-2.9375 2.375 -2.9375 2.375 0 2 C0 1.34 0 0.68 0 0 Z ' fill='%23C34AD4' transform='translate(80,315)'/%3E%3Cpath d='M0 0 C1.21386936 3.64160808 0.6674695 4.33165469 -0.9375 7.6875 C-1.31777344 8.49574219 -1.69804688 9.30398437 -2.08984375 10.13671875 C-2.39019531 10.75160156 -2.69054688 11.36648437 -3 12 C-3.33 12 -3.66 12 -4 12 C-3.28571429 3.42857143 -3.28571429 3.42857143 0 0 Z ' fill='%23F69525' transform='translate(51,178)'/%3E%3Cpath d='M0 0 C0.33 0 0.66 0 1 0 C1.36637589 6.35051546 1.36637589 6.35051546 -0.375 9.4375 C-2 11 -2 11 -4 11 C-2.95902388 7.13351728 -1.96301592 3.50538557 0 0 Z ' fill='%23D88A17' transform='translate(163,160)'/%3E%3Cpath d='M0 0 C0.99 0 1.98 0 3 0 C3 1.32 3 2.64 3 4 C2.34 4 1.68 4 1 4 C0.67 5.65 0.34 7.3 0 9 C-0.33 9 -0.66 9 -1 9 C-1.09765625 2.84765625 -1.09765625 2.84765625 -1 1 C-0.67 0.67 -0.34 0.34 0 0 Z ' fill='%23E8D250' transform='translate(150,159)'/%3E%3Cpath d='M0 0 C0.66 0 1.32 0 2 0 C1.67 2.31 1.34 4.62 1 7 C-0.32 7 -1.64 7 -3 7 C-2.25 2.25 -2.25 2.25 0 0 Z ' fill='%23F1D74C' transform='translate(198,147)'/%3E%3Cpath d='M0 0 C-1.26239712 0.86658615 -2.53527501 1.71792059 -3.8125 2.5625 C-4.87404297 3.27599609 -4.87404297 3.27599609 -5.95703125 4.00390625 C-8 5 -8 5 -11 4 C-4.45384615 -1.48461538 -4.45384615 -1.48461538 0 0 Z ' fill='%23C444B8' transform='translate(133,297)'/%3E%3Cpath d='M0 0 C1.95582488 2.93373731 3.56224304 5.78216298 5 9 C4.67 9.66 4.34 10.32 4 11 C1.34158005 9.37064584 0.16777872 8.51624223 -0.8125 5.5 C-1 3 -1 3 0 0 Z ' fill='%23B830B7' transform='translate(90,281)'/%3E%3Cpath d='M0 0 C0 0.66 0 1.32 0 2 C0.99 2.33 1.98 2.66 3 3 C-1.12168689 4.62950412 -3.70700357 5.26264601 -8 4 C-6.07740436 0.15480872 -4.12054651 0 0 0 Z ' fill='%23B651B8' transform='translate(182,213)'/%3E%3Cpath d='M0 0 C3.11362141 2.07574761 3.98677849 3.3054575 5.75 6.5 C6.42289063 7.69109375 6.42289063 7.69109375 7.109375 8.90625 C7.55023438 9.94265625 7.55023438 9.94265625 8 11 C7.67 11.66 7.34 12.32 7 13 C6.34 13 5.68 13 5 13 C4.35309078 11.3962669 3.70751236 9.79199694 3.0625 8.1875 C2.70285156 7.29417969 2.34320313 6.40085938 1.97265625 5.48046875 C1.26386514 3.6729091 0.6139753 1.84192591 0 0 Z ' fill='%236477D3' transform='translate(232,133)'/%3E%3Cpath d='M0 0 C-1.14453125 1.48828125 -1.14453125 1.48828125 -3 3 C-5.69921875 3.29296875 -5.69921875 3.29296875 -8.6875 3.1875 C-9.68136719 3.16042969 -10.67523438 3.13335937 -11.69921875 3.10546875 C-12.45847656 3.07066406 -13.21773437 3.03585937 -14 3 C-10.07503936 -0.92496064 -5.24412188 -0.08740203 0 0 Z ' fill='%23D8D8D8' transform='translate(172,336)'/%3E%3Cpath d='M0 0 C0.99 1.32 1.98 2.64 3 4 C3.66 3.67 4.32 3.34 5 3 C5 5.64 5 8.28 5 11 C1.87729874 8.48169253 1.05476902 7.2738451 0.25 3.25 C0.1675 2.1775 0.085 1.105 0 0 Z ' fill='%23C75BCD' transform='translate(33,288)'/%3E%3Cpath d='M0 0 C1.4540625 0.0309375 1.4540625 0.0309375 2.9375 0.0625 C0.9575 3.0325 0.9575 3.0325 -1.0625 6.0625 C-1.3925 5.4025 -1.7225 4.7425 -2.0625 4.0625 C-1.7325 3.4025 -1.4025 2.7425 -1.0625 2.0625 C-3.5375 3.5475 -3.5375 3.5475 -6.0625 5.0625 C-3.64893617 0.07446809 -3.64893617 0.07446809 0 0 Z ' fill='%23E5C948' transform='translate(201.0625,144.9375)'/%3E%3Cpath d='M0 0 C0.66 0.33 1.32 0.66 2 1 C1.875 2.75 1.875 2.75 1 5 C-2.0625 7.25 -2.0625 7.25 -5 9 C-3.7508258 5.54074837 -2.32472205 2.85306797 0 0 Z ' fill='%237C3676' transform='translate(106,82)'/%3E%3Cpath d='M0 0 C-1.05078125 1.51953125 -1.05078125 1.51953125 -3 3 C-6.35546875 3.07421875 -6.35546875 3.07421875 -10.1875 2.6875 C-11.45980469 2.56761719 -12.73210937 2.44773437 -14.04296875 2.32421875 C-15.01878906 2.21722656 -15.99460937 2.11023438 -17 2 C-17 1.67 -17 1.34 -17 1 C-15.10440036 0.83069605 -13.20850769 0.66467136 -11.3125 0.5 C-10.25675781 0.4071875 -9.20101562 0.314375 -8.11328125 0.21875 C-5.39363975 0.0276585 -2.72460144 -0.04043935 0 0 Z ' fill='%23D36BDB' transform='translate(124,302)'/%3E%3Cpath d='M0 0 C0.33 0 0.66 0 1 0 C0.88490339 1.41750563 0.75746342 2.83401169 0.625 4.25 C0.55539063 5.03890625 0.48578125 5.8278125 0.4140625 6.640625 C-0.01507113 9.085877 -0.78600638 10.84836903 -2 13 C-2.16682272 8.07872966 -2.24828052 4.49656104 0 0 Z ' fill='%23F98986' transform='translate(36,231)'/%3E%3Cpath d='M0 0 C0.33 0.99 0.66 1.98 1 3 C1.66 3 2.32 3 3 3 C2.67 4.65 2.34 6.3 2 8 C1.34 7.34 0.68 6.68 0 6 C-0.66 7.32 -1.32 8.64 -2 10 C-3 8 -3 8 -2.44140625 6.0546875 C-2.15136719 5.33539063 -1.86132812 4.61609375 -1.5625 3.875 C-1.27503906 3.15054688 -0.98757812 2.42609375 -0.69140625 1.6796875 C-0.46324219 1.12539062 -0.23507813 0.57109375 0 0 Z ' fill='%23F9986D' transform='translate(97,205)'/%3E%3Cpath d='M0 0 C1.15155977 3.45467931 1.50630022 5.8608245 0 9.25 C-0.33 9.8275 -0.66 10.405 -1 11 C-1.66 10.67 -2.32 10.34 -3 10 C-2.49287967 6.28111761 -1.88391785 3.26545761 0 0 Z ' fill='%23F99953' transform='translate(103,190)'/%3E%3Cpath d='M0 0 C0.33 0 0.66 0 1 0 C1 1.65 1 3.3 1 5 C0.34 5 -0.32 5 -1 5 C-1 5.66 -1 6.32 -1 7 C-2.65 7 -4.3 7 -6 7 C-5.34 5.68 -4.68 4.36 -4 3 C-3.67 3.66 -3.34 4.32 -3 5 C-2.525625 4.175 -2.05125 3.35 -1.5625 2.5 C-1.046875 1.675 -0.53125 0.85 0 0 Z ' fill='%23F8A64B' transform='translate(51,184)'/%3E%3Cpath d='M0 0 C0.33 0.66 0.66 1.32 1 2 C1.99 2 2.98 2 4 2 C3.67 3.98 3.34 5.96 3 8 C2.01 8.33 1.02 8.66 0 9 C0.185625 8.2575 0.37125 7.515 0.5625 6.75 C0.99203108 4.05009037 0.85122974 2.55368923 0 0 Z ' fill='%23EB8E47' transform='translate(59,158)'/%3E%3Cpath d='M0 0 C0.77772405 2.33317216 1.42415568 4.61435923 2 7 C1.01 7 0.02 7 -1 7 C-1.33 7.66 -1.66 8.32 -2 9 C-2.66 9 -3.32 9 -4 9 C-2.80100302 5.9168649 -1.52299523 2.93720508 0 0 Z ' fill='%23D97748' transform='translate(71,136)'/%3E%3Cpath d='M0 0 C2.64 0.66 5.28 1.32 8 2 C8 2.99 8 3.98 8 5 C5.36 4.34 2.72 3.68 0 3 C0 2.01 0 1.02 0 0 Z ' fill='%23D7D7D9' transform='translate(122,360)'/%3E%3Cpath d='M0 0 C1.44977894 2.34112451 2.04314411 3.5796929 1.7578125 6.359375 C1.54898438 7.14828125 1.34015625 7.9371875 1.125 8.75 C0.92132813 9.54921875 0.71765625 10.3484375 0.5078125 11.171875 C0.34023438 11.77515625 0.17265625 12.3784375 0 13 C-0.33 13 -0.66 13 -1 13 C-1.0272415 11.58344207 -1.04650467 10.16672955 -1.0625 8.75 C-1.07410156 7.96109375 -1.08570312 7.1721875 -1.09765625 6.359375 C-1.00385306 4.09308998 -0.63241063 2.1711105 0 0 Z ' fill='%23F47873' transform='translate(33,231)'/%3E%3Cpath d='M0 0 C0.94875 0.04125 1.8975 0.0825 2.875 0.125 C1.225 2.105 -0.425 4.085 -2.125 6.125 C-2.455 5.135 -2.785 4.145 -3.125 3.125 C-3.785 2.795 -4.445 2.465 -5.125 2.125 C-3.125 0.125 -3.125 0.125 0 0 Z ' fill='%23D9BC48' transform='translate(156.125,155.875)'/%3E%3Cpath d='M0 0 C0.33 0.66 0.66 1.32 1 2 C0.67 2.99 0.34 3.98 0 5 C0.66 5 1.32 5 2 5 C1.67 5.66 1.34 6.32 1 7 C0.34 7 -0.32 7 -1 7 C-1.33 7.66 -1.66 8.32 -2 9 C-2.66 9 -3.32 9 -4 9 C-2.94124926 5.59687262 -1.99097846 2.98646769 0 0 Z ' fill='%23DB622B' transform='translate(122,147)'/%3E%3Cpath d='M0 0 C2.625 -0.1875 2.625 -0.1875 5 0 C5 0.66 5 1.32 5 2 C5.66 2.66 6.32 3.32 7 4 C4.03 3.67 1.06 3.34 -2 3 C-1.34 2.01 -0.68 1.02 0 0 Z ' fill='%23BF5FCD' transform='translate(215,213)'/%3E%3Cpath d='M0 0 C1.60080151 4.00200378 0.29279692 7.04556236 -1 11 C-2.1875 9.4375 -2.1875 9.4375 -3 7 C-1.625 3.25 -1.625 3.25 0 0 Z ' fill='%23F99B4D' transform='translate(48,192)'/%3E%3Cpath d='M0 0 C0.33 0 0.66 0 1 0 C0.67 2.64 0.34 5.28 0 8 C-0.99 8.33 -1.98 8.66 -3 9 C-2.44271087 5.65626525 -1.64826111 2.96687001 0 0 Z ' fill='%23E27D35' transform='translate(63,151)'/%3E%3Cpath d='M0 0 C1.485 0.99 1.485 0.99 3 2 C2.6875 3.9375 2.6875 3.9375 2 6 C1.01 6.33 0.02 6.66 -1 7 C-0.67 4.69 -0.34 2.38 0 0 Z ' fill='%23E19D21' transform='translate(160,157)'/%3E%3Cpath d='M0 0 C0.66 0 1.32 0 2 0 C2.6875 1.6875 2.6875 1.6875 3 4 C1.5625 6.75 1.5625 6.75 0 9 C-1.10844919 5.67465243 -0.84454356 3.37817425 0 0 Z ' fill='%23D4D4D7' transform='translate(1,148)'/%3E%3Cpath d='M0 0 C2.64 0 5.28 0 8 0 C7.625 1.9375 7.625 1.9375 7 4 C6.01 4.495 6.01 4.495 5 5 C4.67 4.01 4.34 3.02 4 2 C1.99983534 0.79117904 1.99983534 0.79117904 0 0 Z ' fill='%23DCAF37' transform='translate(199,144)'/%3E%3Cpath d='M0 0 C0.66 0.99 1.32 1.98 2 3 C0.03533587 4.06775224 -1.96855359 5.06553465 -4 6 C-4.66 5.67 -5.32 5.34 -6 5 C-4.02 3.35 -2.04 1.7 0 0 Z ' fill='%23D1D1D3' transform='translate(301,327)'/%3E%3Cpath d='M0 0 C1.20628008 2.33214148 2.1654738 4.49642139 3 7 C2.0625 9.1875 2.0625 9.1875 1 11 C-0.20272819 8.59454362 -0.10071472 7.05003047 -0.0625 4.375 C-0.05347656 3.55773437 -0.04445313 2.74046875 -0.03515625 1.8984375 C-0.02355469 1.27195313 -0.01195312 0.64546875 0 0 Z ' fill='%23B898D8' transform='translate(314,192)'/%3E%3Cpath d='M0 0 C1.4370809 -0.05422947 2.87475462 -0.09289723 4.3125 -0.125 C5.11300781 -0.14820313 5.91351563 -0.17140625 6.73828125 -0.1953125 C9 0 9 0 12 2 C7.48281619 3.36884358 4.41225737 2.47075246 0 1 C0 0.67 0 0.34 0 0 Z ' fill='%23E4E4E8' transform='translate(205,3)'/%3E%3C/svg%3E%0A",
            name: 'AARYA',
            welcomeText: 'Hi ð   , how can we help?',
            responseTimeText: 'We typically respond right away',
            poweredBy: {
                text: 'Powered by 6D Technologies',
                link: 'https://www.6dtechnologies.com/',
                logo: '' // Add this line
            }
        },
        style: {
            primaryColor: '#854fff',
            secondaryColor: '#6b3fd4',
            position: 'right',
            backgroundColor: '#ffffff',
            fontColor: '#333333'
        },
        options: {
            allowFileUploads: true
        }
    };


    window.addEventListener('resize', () => {
    const chatContainer = document.querySelector('.n8n-chat-widget .chat-container');
    if (chatContainer && chatContainer.classList.contains('open')) {
        // chatContainer.style.bottom = '30px';
        // chatContainer.style.right = '20px';
        chatContainer.style.borderColor = 'rgb(50, 0, 107)  #5c006b  rgb(8, 49, 130)  rgb(8, 49, 130)';
        chatContainer.style.borderRightWidth = 'thick';
        chatContainer.style.borderLeftWidth = 'thick';
        chatContainer.style.borderBottomWidth = 'thick';
        // chatContainer.style.left = ''; 
    }
    });



    // Merge user config with defaults
    const config = window.ChatWidgetConfig ? 
        {
            webhook: { ...defaultConfig.webhook, ...window.ChatWidgetConfig.webhook },
            branding: { ...defaultConfig.branding, ...window.ChatWidgetConfig.branding },
            style: { ...defaultConfig.style, ...window.ChatWidgetConfig.style },
            options: { ...defaultConfig.options, ...window.ChatWidgetConfig.options },
            wss: {...defaultConfig.wss, ...window.ChatWidgetConfig.wss }
        } : defaultConfig;

    // Prevent multiple initializations
    if (window.N8NChatWidgetInitialized) return;
    window.N8NChatWidgetInitialized = true;

    let currentSessionId = '';
    let currentFiles = [];
    let isRecording = false;

    // Create widget container
    const widgetContainer = document.createElement('div');
    widgetContainer.className = 'n8n-chat-widget';
    
    // Set CSS variables for colors
    widgetContainer.style.setProperty('--n8n-chat-primary-color', config.style.primaryColor);
    widgetContainer.style.setProperty('--n8n-chat-secondary-color', config.style.secondaryColor);
    widgetContainer.style.setProperty('--n8n-chat-background-color', config.style.backgroundColor);
    widgetContainer.style.setProperty('--n8n-chat-font-color', config.style.fontColor);

    const chatContainer = document.createElement('div');
    chatContainer.className = `chat-container${config.style.position === 'left' ? ' position-left' : ''}`;
    
    const chatInterfaceHTML = `
            <div class="chat-interface">
                <div class="brand-header">
                    <span><svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 212 56" width="100" height="25">
                            <path d="M0 0 C0 1.32 0 2.64 0 4 C-0.66 4 -1.32 4 -2 4 C-2 4.99 -2 5.98 -2 7 C-1.26394531 7.09796875 -0.52789063 7.1959375 0.23046875 7.296875 C10.33390242 8.84508941 10.33390242 8.84508941 14 13 C14.8125 15.25 14.8125 15.25 15 17 C16.32 17.33 17.64 17.66 19 18 C19 21.63 19 25.26 19 29 C18.01 29.33 17.02 29.66 16 30 C14.79117904 32.00016466 14.79117904 32.00016466 14 34 C13.34 34 12.68 34 12 34 C12 34.66 12 35.32 12 36 C9.73192796 37.0067004 7.46092246 38.00551766 5.1875 39 C4.54490234 39.28617188 3.90230469 39.57234375 3.24023438 39.8671875 C0.32243531 41.13711041 -1.78265714 42 -5 42 C-5 40.68 -5 39.36 -5 38 C-5.75925781 37.95101562 -6.51851562 37.90203125 -7.30078125 37.8515625 C-8.29464844 37.77679688 -9.28851562 37.70203125 -10.3125 37.625 C-11.29863281 37.55539063 -12.28476562 37.48578125 -13.30078125 37.4140625 C-16 37 -16 37 -19 35 C-19 34.34 -19 33.68 -19 33 C-19.66 33 -20.32 33 -21 33 C-21 32.01 -21 31.02 -21 30 C-21.639375 29.87625 -22.27875 29.7525 -22.9375 29.625 C-23.9584375 29.315625 -23.9584375 29.315625 -25 29 C-26.20272819 26.59454362 -26.10071472 25.05003047 -26.0625 22.375 C-26.05347656 21.55773437 -26.04445313 20.74046875 -26.03515625 19.8984375 C-26.02355469 19.27195312 -26.01195312 18.64546875 -26 18 C-25.03900391 17.82597656 -25.03900391 17.82597656 -24.05859375 17.6484375 C-23.37925781 17.43445313 -22.69992188 17.22046875 -22 17 C-21.690625 16.21625 -21.38125 15.4325 -21.0625 14.625 C-19.62590758 11.07577167 -18.52451269 10.51050544 -15 9 C-11.35427854 8.17842897 -7.69568037 7.55014506 -4 7 C-4 6.01 -4 5.02 -4 4 C-4.66 4 -5.32 4 -6 4 C-6 2.68 -6 1.36 -6 0 C-3.50907189 -1.24546405 -2.58919267 -0.7767578 0 0 Z " fill="#CACDD0" transform="translate(31,7)"/>
                            <path d="M0 0 C1.58748047 -0.0299707 1.58748047 -0.0299707 3.20703125 -0.06054688 C4.72876953 -0.05958008 4.72876953 -0.05958008 6.28125 -0.05859375 C7.6744043 -0.06137329 7.6744043 -0.06137329 9.09570312 -0.06420898 C11.5 0.4375 11.5 0.4375 13.3034668 2.30029297 C14.82430072 5.01675494 14.86729985 6.90170081 14.8125 10 C14.80863281 10.95003906 14.80476563 11.90007813 14.80078125 12.87890625 C14.5 15.4375 14.5 15.4375 12.5 18.4375 C8.4951979 19.880311 4.26936741 19.62140746 0.0625 19.625 C-0.68837891 19.63724609 -1.43925781 19.64949219 -2.21289062 19.66210938 C-6.39120456 19.67313395 -9.74381715 19.50014376 -13.5 17.4375 C-14.85281371 14.73187257 -14.70609362 12.51856345 -14.75 9.5 C-14.77578125 8.43910156 -14.8015625 7.37820312 -14.828125 6.28515625 C-14.5 3.4375 -14.5 3.4375 -13.30566406 1.78662109 C-9.60321762 -0.97970111 -4.44163789 -0.02975519 0 0 Z " fill="#071942" transform="translate(27.5,20.5625)"/>
                            <path d="M0 0 C1.60294922 0.04060547 1.60294922 0.04060547 3.23828125 0.08203125 C4.04652344 0.11683594 4.85476562 0.15164063 5.6875 0.1875 C5.6875 1.5075 5.6875 2.8275 5.6875 4.1875 C4.84445313 4.30867188 4.00140625 4.42984375 3.1328125 4.5546875 C2.03710938 4.72226562 0.94140625 4.88984375 -0.1875 5.0625 C-1.82332031 5.30613281 -1.82332031 5.30613281 -3.4921875 5.5546875 C-6.43182714 5.95006513 -6.43182714 5.95006513 -8.3125 8.1875 C-8.55627883 11.54494112 -8.55627883 11.54494112 -8.4375 15.3125 C-8.39625 17.58125 -8.355 19.85 -8.3125 22.1875 C-3.6925 22.8475 0.9275 23.5075 5.6875 24.1875 C5.6875 25.5075 5.6875 26.8275 5.6875 28.1875 C0.02975575 29.36619672 -3.81360636 29.08367022 -9.3125 27.1875 C-9.6425 26.1975 -9.9725 25.2075 -10.3125 24.1875 C-10.9725 24.1875 -11.6325 24.1875 -12.3125 24.1875 C-12.3125 23.1975 -12.3125 22.2075 -12.3125 21.1875 C-12.951875 21.06375 -13.59125 20.94 -14.25 20.8125 C-15.2709375 20.503125 -15.2709375 20.503125 -16.3125 20.1875 C-17.51522819 17.78204362 -17.41321472 16.23753047 -17.375 13.5625 C-17.36597656 12.74523438 -17.35695313 11.92796875 -17.34765625 11.0859375 C-17.33605469 10.45945312 -17.32445312 9.83296875 -17.3125 9.1875 C-16.67183594 9.07148438 -16.03117187 8.95546875 -15.37109375 8.8359375 C-14.69175781 8.62195312 -14.01242188 8.40796875 -13.3125 8.1875 C-13.003125 7.40375 -12.69375 6.62 -12.375 5.8125 C-10.12962936 0.26511373 -5.4692016 -0.18030335 0 0 Z " fill="#E1E3E5" transform="translate(22.3125,15.8125)"/>
                            <path d="M0 0 C0.99 0 1.98 0 3 0 C4.80932617 2.44677734 4.80932617 2.44677734 6.79296875 5.8359375 C7.14386063 6.43048737 7.4947525 7.02503723 7.85627747 7.63760376 C8.59683039 8.89727134 9.3320207 10.16010449 10.06225586 11.42578125 C11.18263767 13.36657716 12.31919209 15.29711503 13.45898438 17.2265625 C19 26.68803427 19 26.68803427 19 29 C17.20214844 28.80688477 17.20214844 28.80688477 15 28 C13.35253906 25.86694336 13.35253906 25.86694336 11.765625 23.08984375 C11.19199219 22.10048828 10.61835938 21.11113281 10.02734375 20.09179688 C9.44082031 19.05087891 8.85429687 18.00996094 8.25 16.9375 C7.64800781 15.89271484 7.04601562 14.84792969 6.42578125 13.77148438 C4.93899335 11.1873054 3.46441589 8.59690173 2 6 C-0.31169188 8.14720046 -1.90197989 10.285238 -3.48046875 13.01171875 C-3.92197266 13.76904297 -4.36347656 14.52636719 -4.81835938 15.30664062 C-5.27017578 16.09232422 -5.72199219 16.87800781 -6.1875 17.6875 C-6.65091797 18.48478516 -7.11433594 19.28207031 -7.59179688 20.10351562 C-8.73202978 22.06659701 -9.86657216 24.03298171 -11 26 C-6.71 26 -2.42 26 2 26 C2 26.99 2 27.98 2 29 C-3.94 29 -9.88 29 -16 29 C-14.59808824 23.39235298 -11.63767202 18.94957791 -8.68066406 14.01708984 C-7.62417126 12.24861276 -6.58537221 10.47049528 -5.546875 8.69140625 C-4.88429688 7.58152344 -4.22171875 6.47164062 -3.5390625 5.328125 C-2.93271973 4.3062207 -2.32637695 3.28431641 -1.70166016 2.23144531 C-1.1401123 1.49506836 -0.57856445 0.75869141 0 0 Z " fill="#0099FF" transform="translate(120,11)"/>
                            <path d="M0 0 C4.1050322 1.50797101 5.48371035 3.9046321 7.671875 7.59375 C8.66767578 9.26244141 8.66767578 9.26244141 9.68359375 10.96484375 C10.02245605 11.54476074 10.36131836 12.12467773 10.71044922 12.72216797 C11.75007689 14.5001315 12.80521677 16.26811493 13.86328125 18.03515625 C19 26.71028009 19 26.71028009 19 29 C16.16097855 28.66651907 15.19583146 28.2388691 13.35253906 25.99047852 C12.82885742 25.12865967 12.30517578 24.26684082 11.765625 23.37890625 C11.19199219 22.44369141 10.61835937 21.50847656 10.02734375 20.54492188 C9.44082031 19.56072266 8.85429688 18.57652344 8.25 17.5625 C7.64800781 16.58216797 7.04601562 15.60183594 6.42578125 14.59179688 C2 7.30079897 2 7.30079897 2 5 C1.34 5 0.68 5 0 5 C-0.23460938 5.65355469 -0.46921875 6.30710937 -0.7109375 6.98046875 C-2.39755459 10.93124152 -4.49426475 14.58704258 -6.625 18.3125 C-7.04523438 19.05306641 -7.46546875 19.79363281 -7.8984375 20.55664062 C-8.92948495 22.37269011 -9.96436046 24.18656533 -11 26 C-6.71 26 -2.42 26 2 26 C2 26.99 2 27.98 2 29 C-3.94 29 -9.88 29 -16 29 C-15.08902355 24.44511776 -14.23484962 22.33715277 -11.875 18.515625 C-11.25109375 17.49855469 -10.6271875 16.48148438 -9.984375 15.43359375 C-9.32953125 14.38300781 -8.6746875 13.33242188 -8 12.25 C-7.34515625 11.18394531 -6.6903125 10.11789063 -6.015625 9.01953125 C-1.18542359 1.18542359 -1.18542359 1.18542359 0 0 Z " fill="#0099FF" transform="translate(82,11)"/>
                            <path d="M0 0 C0.99 0 1.98 0 3 0 C4.70166016 2.23144531 4.70166016 2.23144531 6.5390625 5.328125 C7.53292969 6.99294922 7.53292969 6.99294922 8.546875 8.69140625 C9.05831055 9.56756592 9.05831055 9.56756592 9.58007812 10.46142578 C10.61667748 12.2357545 11.66996428 13.99924189 12.7265625 15.76171875 C18.31280487 25.19941338 18.31280487 25.19941338 19 29 C17.20214844 28.80688477 17.20214844 28.80688477 15 28 C13.35253906 25.86694336 13.35253906 25.86694336 11.765625 23.08984375 C11.19199219 22.10048828 10.61835938 21.11113281 10.02734375 20.09179688 C9.44082031 19.05087891 8.85429687 18.00996094 8.25 16.9375 C7.64800781 15.89271484 7.04601562 14.84792969 6.42578125 13.77148438 C4.93899335 11.1873054 3.46441589 8.59690173 2 6 C-1.40967302 10.02748075 -4.08703775 14.28025969 -6.75 18.8125 C-7.16121094 19.50537109 -7.57242188 20.19824219 -7.99609375 20.91210938 C-9.0007858 22.6060669 -10.00086825 24.30275696 -11 26 C-6.71 26 -2.42 26 2 26 C2 26.99 2 27.98 2 29 C-3.94 29 -9.88 29 -16 29 C-14.56569967 24.69709901 -13.51056635 21.85631132 -11.25 18.14453125 C-10.7240625 17.27505859 -10.198125 16.40558594 -9.65625 15.50976562 C-9.1096875 14.61966797 -8.563125 13.72957031 -8 12.8125 C-7.18015625 11.45995117 -7.18015625 11.45995117 -6.34375 10.08007812 C-4.2789297 6.68172804 -2.20598913 3.3089837 0 0 Z " fill="#0099FF" transform="translate(193,11)"/>
                            <path d="M0 0 C4.06564732 1.35521577 5.1350785 4.04035171 7.1875 7.5625 C7.55552734 8.17802734 7.92355469 8.79355469 8.30273438 9.42773438 C9.209679 10.94716109 10.10588168 12.47299033 11 14 C11.93899975 12.60517513 12.87612511 11.20908834 13.8125 9.8125 C14.63621094 8.58660156 14.63621094 8.58660156 15.4765625 7.3359375 C17.09403566 4.91895266 17.09403566 4.91895266 18.6875 1.9375 C19.3371875 0.9784375 19.3371875 0.9784375 20 0 C20.99 0 21.98 0 23 0 C22.33781714 3.34070772 21.07410651 5.8975147 19.3828125 8.84375 C18.85816406 9.76027344 18.33351562 10.67679688 17.79296875 11.62109375 C17.24253906 12.57113281 16.69210938 13.52117188 16.125 14.5 C15.58230469 15.45003906 15.03960937 16.40007813 14.48046875 17.37890625 C9.25817998 26.45726155 9.25817998 26.45726155 7 29 C6.01 29 5.02 29 4 29 C5.05875074 25.59687262 6.00902154 22.98646769 8 20 C7.72854517 14.7428248 4.521004 10.79251607 1.70703125 6.55273438 C0.74994182 5.06907423 -0.13171807 3.53732043 -1 2 C-0.67 1.34 -0.34 0.68 0 0 Z " fill="#0099FF" transform="translate(160,11)"/>
                            <path d="M0 0 C2.06183633 -0.08150744 4.12461349 -0.1394194 6.1875 -0.1875 C7.33605469 -0.22230469 8.48460937 -0.25710938 9.66796875 -0.29296875 C13.3044035 0.02676467 15.1105914 0.81841727 18 3 C19.56935594 6.13871188 19.35201103 8.53855822 19 12 C16.5 14.75 16.5 14.75 14 17 C13.7226499 20.18490007 13.7226499 20.18490007 16 23 C18 26 18 26 18 29 C15.0570014 28.67300016 14.16164014 28.19941672 12.26171875 25.85546875 C11.74222656 24.97503906 11.22273437 24.09460938 10.6875 23.1875 C10.15511719 22.31480469 9.62273437 21.44210938 9.07421875 20.54296875 C8 18 8 18 8.17578125 15.75 C9 14 9 14 11.5 12.8125 C12.325 12.544375 13.15 12.27625 14 12 C15.27003323 10.94689723 15.27003323 10.94689723 15.1875 8.5625 C15.26839983 5.83265325 15.26839983 5.83265325 13 4 C9.87803664 3.53513282 9.87803664 3.53513282 6.375 3.375 C5.18648437 3.30023438 3.99796875 3.22546875 2.7734375 3.1484375 C1.85820312 3.09945313 0.94296875 3.05046875 0 3 C0 2.01 0 1.02 0 0 Z " fill="#FF9200" transform="translate(137,11)"/>
                            <path d="M0 0 C0 2.31 0 4.62 0 7 C0.66 7 1.32 7 2 7 C2 4.69 2 2.38 2 0 C2.99 0.33 3.98 0.66 5 1 C5.3125 3.6875 5.3125 3.6875 5 7 C2.6875 9.875 2.6875 9.875 0 12 C-0.99 12 -1.98 12 -3 12 C-4.52491998 8.95016004 -4.23562548 6.3576631 -4 3 C-1.77419355 0 -1.77419355 0 0 0 Z " fill="#122B5D" transform="translate(17,26)"/>
                            <path d="M0 0 C0 1.32 0 2.64 0 4 C-0.66 4 -1.32 4 -2 4 C-2 4.99 -2 5.98 -2 7 C-1.01 7.33 -0.02 7.66 1 8 C1 8.33 1 8.66 1 9 C-1.97 9 -4.94 9 -8 9 C-6.68 8.34 -5.36 7.68 -4 7 C-4 6.01 -4 5.02 -4 4 C-4.66 4 -5.32 4 -6 4 C-6 2.68 -6 1.36 -6 0 C-3.50907189 -1.24546405 -2.58919267 -0.7767578 0 0 Z " fill="#2881C5" transform="translate(31,7)"/>
                            <path d="M0 0 C0.99 0 1.98 0 3 0 C3 4.29 3 8.58 3 13 C2.01 12.67 1.02 12.34 0 12 C-1.1898306 9.6203388 -1.13349966 8.08514265 -1.125 5.4375 C-1.12886719 4.22900391 -1.12886719 4.22900391 -1.1328125 2.99609375 C-1 1 -1 1 0 0 Z " fill="#32B6EF" transform="translate(6,24)"/>
                            <path d="M0 0 C3.53571429 0.53571429 3.53571429 0.53571429 5 2 C5.04092937 4.33297433 5.04241723 6.66705225 5 9 C4.34 9 3.68 9 3 9 C2.67 7.02 2.34 5.04 2 3 C1.67 3 1.34 3 1 3 C0.67 4.98 0.34 6.96 0 9 C-0.66 9 -1.32 9 -2 9 C-2.125 5.625 -2.125 5.625 -2 2 C-1.34 1.34 -0.68 0.68 0 0 Z " fill="#35BAF7" transform="translate(34,24)"/>
                            <path d="M0 0 C2.475 0.99 2.475 0.99 5 2 C5 4.31 5 6.62 5 9 C4.34 9 3.68 9 3 9 C2.87625 8.030625 2.7525 7.06125 2.625 6.0625 C2.315625 4.5465625 2.315625 4.5465625 2 3 C1.34 2.67 0.68 2.34 0 2 C0 4.31 0 6.62 0 9 C-0.66 9 -1.32 9 -2 9 C-2.125 5.625 -2.125 5.625 -2 2 C-1.34 1.34 -0.68 0.68 0 0 Z " fill="#35BBF8" transform="translate(19,24)"/>
                            <path d="M0 0 C1.32 0.33 2.64 0.66 4 1 C4 4.63 4 8.26 4 12 C3.01 12 2.02 12 1 12 C0.67 8.04 0.34 4.08 0 0 Z " fill="#2F7ADD" transform="translate(46,24)"/>
                            <path d="M0 0 C-2.07143201 4.03384128 -3.96615872 5.92856799 -8 8 C-8.36075949 3.55063291 -8.36075949 3.55063291 -6.8125 1.1875 C-4.44017475 -0.36678206 -2.77958655 -0.22537188 0 0 Z " fill="#152E62" transform="translate(21,21)"/>
                            <path d="M0 0 C0 2.64 0 5.28 0 8 C-1.98 8.99 -1.98 8.99 -4 10 C-4.36814024 3.49618902 -4.36814024 3.49618902 -2.5625 1.0625 C-1 0 -1 0 0 0 Z " fill="#06163E" transform="translate(17,26)"/>
                            <path d="M0 0 C1.9453125 -0.29296875 1.9453125 -0.29296875 4.125 -0.1875 C5.40375 -0.125625 6.6825 -0.06375 8 0 C6.68 1.65 5.36 3.3 4 5 C2.02 4.34 0.04 3.68 -2 3 C-1.34 2.01 -0.68 1.02 0 0 Z " fill="#071B44" transform="translate(21,21)"/>
                            <path d="M0 0 C1.32 0.33 2.64 0.66 4 1 C1.36 3.64 -1.28 6.28 -4 9 C-4.33 7.68 -4.66 6.36 -5 5 C-2.8125 2.1875 -2.8125 2.1875 0 0 Z " fill="#152E63" transform="translate(29,21)"/>
                            <path d="M0 0 C1.98 0 3.96 0 6 0 C5.6875 1.9375 5.6875 1.9375 5 4 C4.01 4.33 3.02 4.66 2 5 C1.01 4.01 0.02 3.02 -1 2 C-0.67 1.34 -0.34 0.68 0 0 Z " fill="#30A9E4" transform="translate(25,32)"/>
                            <path d="M0 0 C-6.625 3 -6.625 3 -10 3 C-10 2.01 -10 1.02 -10 0 C-3.375 -1.125 -3.375 -1.125 0 0 Z " fill="#D4D6D7" transform="translate(36,46)"/>
                            </svg></span>


                    <button class="refresh-button" title="Refresh chat">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                            <path d="M17.65 6.35A7.958 7.958 0 0 0 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0 1 12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
                        </svg>
                    </button>
                    <button class="close-button">×</button>

                </div>
                <div class="chat-messages"></div>
                <div class="chat-input">
                    <div id="file-preview-container"></div>
                    <div class="input-row">
                        <div class="textarea-wrapper">
                            <textarea id="chat-textarea" placeholder="" rows="1" style="height: 40px !important;"></textarea>
                            <button class="file-upload-button" title="Upload file">
                            <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                width="20" height="20" viewBox="0 0 512.000000 512.000000"
                                preserveAspectRatio="xMidYMid meet">
                                <metadata>
                                Created by potrace 1.16, written by Peter Selinger 2001-2019
                                </metadata>
                                <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                                fill="#000000" stroke="none">
                                <path d="M3880 4679 c-103 -14 -254 -67 -353 -125 -75 -44 -169 -136 -1103 -1069 -880 -879 -1025 -1028 -1051 -1080 -56 -110 -68 -160 -68 -285 0 -144    23 -226 96 -334 111 -167 281 -256 489 -256 110 0 190 19 285 68 63 32 129 95 703 666 349 347 643 644 654 659 90 124 -18 290 -169 262 -34 -6 -113 -81
                                -678 -645 -489 -488 -651 -644 -685 -659 -59 -27 -160 -28 -215 -2 -95 44
                                -160 151 -153 250 2 31 14 76 26 101 16 33 281 304 1009 1031 915 913 993 988
                                1059 1022 87 45 176 67 269 67 358 0 637 -331 571 -679 -9 -48 -31 -115 -52
                                -160 -36 -74 -62 -101 -1263 -1304 -674 -676 -1255 -1251 -1291 -1278 -82 -62
                                -202 -122 -305 -151 -107 -30 -342 -33 -450 -5 -170 45 -368 169 -470 295
                                -247 305 -283 691 -94 1030 40 70 126 160 1020 1057 1047 1050 1008 1008 996
                                1098 -6 47 -30 83 -78 115 -29 20 -44 23 -95 20 -50 -3 -68 -9 -100 -35 -78
                                -63 -1882 -1880 -1928 -1942 -103 -140 -166 -272 -214 -450 -24 -88 -26 -113
                                -27 -296 0 -223 12 -292 81 -463 258 -644 1006 -945 1646 -663 202 89 156 47
                                1511 1400 687 685 1268 1273 1292 1306 112 156 165 327 165 530 0 262 -91 479
                                -276 656 -86 81 -143 120 -248 170 -148 69 -343 99 -506 78z"/>
                                </g>
                            </svg>
                            </button>
                            <button class="mic-button" title="Record voice">
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 512.000000 512.000000">
                                    <path d="M0 0 C1.51671886 1.26424817 3.0593383 2.49722026 4.60253906 3.72900391 C19.28864031 15.68237492 33.1902857 29.28168978 44.33349609 44.62451172 C45.62066708 46.38127784 46.9453607 48.10442915 48.27832031 49.82666016 C72.45591287 81.38831197 88.32687017 120.12752123 94.56347656 159.30322266 C94.72428711 160.30675781 94.88509766 161.31029297 95.05078125 162.34423828 C99.15307909 189.19102865 98.85784384 216.50430539 94.56347656 243.30322266 C94.40782227 244.28097656 94.25216797 245.25873047 94.09179688 246.26611328 C83.83070262 307.66882901 48.55341729 366.91574741 -1.70214844 404.01318359 C-3.45613547 405.31781021 -5.18141301 406.65442649 -6.90527344 407.99853516 C-58.49573872 447.71022316 -126.64664264 463.36497081 -190.72607422 455.71557617 C-232.1290536 450.25493496 -271.20213463 435.19680584 -305.43652344 411.30322266 C-306.15565918 410.80177734 -306.87479492 410.30033203 -307.61572266 409.78369141 C-318.02591578 402.43816999 -327.32460976 394.18751632 -336.43652344 385.30322266 C-337.07509277 384.69043457 -337.71366211 384.07764648 -338.37158203 383.44628906 C-346.67181637 375.47831329 -354.27219981 367.3099454 -361.12597656 358.0625 C-362.45449434 356.27909852 -363.81012381 354.5191275 -365.17089844 352.76025391 C-404.6647793 301.10368044 -421.02435224 232.73318877 -412.84033203 168.60058594 C-412.40469949 165.49544331 -411.93264328 162.39924907 -411.43652344 159.30322266 C-411.28086914 158.32546875 -411.12521484 157.34771484 -410.96484375 156.34033203 C-402.66879853 106.69653249 -378.42754956 60.28925426 -343.43652344 24.30322266 C-342.82550781 23.66642578 -342.21449219 23.02962891 -341.58496094 22.37353516 C-333.27930111 13.73697254 -324.82481479 5.71874882 -315.1796875 -1.40234375 C-313.40167473 -2.7226552 -311.64898673 -4.07204745 -309.89746094 -5.42724609 C-231.90738178 -65.10203185 -121.53510399 -69.85830349 0 0 Z " fill="#2F6FDD" transform="translate(414.4365234375,54.69677734375)"/>
                                    <path d="M0 0 C12.42224174 10.39773082 19.76584284 22.52302065 23.8125 38.1875 C23.98958874 38.80172569 24.16667747 39.41595139 24.34913254 40.04878998 C24.87862699 42.49271446 24.94449123 44.71825806 24.95294189 47.21936035 C24.95865204 48.23404388 24.96436218 49.24872742 24.97024536 50.29415894 C24.97192215 51.95549362 24.97192215 51.95549362 24.97363281 53.65039062 C24.97859772 54.82163483 24.98356262 55.99287903 24.98867798 57.19961548 C25.00077656 60.41083164 25.0082431 63.62201141 25.01268864 66.83324623 C25.01562559 68.84415082 25.01973173 70.85504979 25.02419281 72.86595154 C25.03786635 79.17067833 25.04753158 85.47539218 25.0513947 91.78013277 C25.05586392 99.03259997 25.07335924 106.28487762 25.1023953 113.53728724 C25.12410805 119.15789494 25.1341042 124.77844973 25.13543582 130.39909887 C25.13647778 133.74854452 25.1437283 137.09767117 25.16025543 140.44709778 C25.1774211 144.1946929 25.17540931 147.94183402 25.16894531 151.68945312 C25.1781601 152.78081573 25.18737488 153.87217834 25.1968689 154.99661255 C25.14152213 165.30482332 23.00793096 174.98339502 18.3125 184.1875 C17.97210693 184.859021 17.63171387 185.53054199 17.28100586 186.22241211 C8.18571212 203.25357726 -8.13754902 214.27458502 -26.1875 220.1875 C-40.96035048 223.42695866 -57.47272057 222.52258239 -71.1875 216.1875 C-72.15429688 215.7646875 -73.12109375 215.341875 -74.1171875 214.90625 C-89.98826543 207.17303356 -102.02001346 192.36911802 -108.50275135 176.19633675 C-111.19925232 168.28565266 -111.48105258 160.32587591 -111.4621582 152.04345703 C-111.46726913 150.87133667 -111.47238007 149.69921631 -111.47764587 148.49157715 C-111.49146955 144.64276935 -111.49059054 140.79414207 -111.48828125 136.9453125 C-111.49059497 134.9344191 -111.49409906 132.92353004 -111.497688 130.91263855 C-111.50874341 124.59782809 -111.50924309 118.28307714 -111.50317383 111.96826172 C-111.49713751 105.48463012 -111.50944538 99.00121572 -111.5307439 92.51762116 C-111.54843871 86.9223599 -111.55434891 81.32716728 -111.55110615 75.73187912 C-111.54930558 72.40266223 -111.55314744 69.07372314 -111.56582069 65.74451065 C-111.57823904 62.02628374 -111.57136063 58.30855178 -111.55981445 54.59033203 C-111.56745819 53.50839569 -111.57510193 52.42645935 -111.58297729 51.31173706 C-111.45647745 32.76193832 -103.84802264 17.3438609 -91.171875 4.078125 C-65.69586911 -20.26561396 -27.45332059 -20.96435391 0 0 Z " fill="#FEFEFE" transform="translate(299.1875,103.8125)"/>
                                    <path d="M0 0 C2.87029869 1.79393668 4.49131638 2.98263276 6 6 C6.19375772 8.12291066 6.38273173 10.24640357 6.54345703 12.37207031 C8.67955691 39.55053259 18.92903508 63.9102293 40 82 C60.17214379 97.7804004 84.37234267 105.60533967 110 103 C136.11046367 99.09316278 159.09631304 86.76179985 175.1953125 65.5859375 C184.9892939 51.55213731 190.84389608 36.36245029 192.484375 19.2890625 C192.56212158 18.48428467 192.63986816 17.67950684 192.7199707 16.8503418 C192.86174081 15.2778233 192.98614651 13.7036127 193.09057617 12.12817383 C193.50778592 7.22582299 194.4871831 4.47282278 198 1 C201.47263273 -0.73631636 205.21193013 -0.60190402 209 0 C211.75569447 2.18159145 213.43588747 3.87177494 215 7 C217.33691368 35.85816665 204.52083635 63.88912672 186.75390625 85.765625 C167.41565338 108.24074242 140.16137552 121.08386245 111 124 C111 134.23 111 144.46 111 155 C114.26261719 154.96519531 117.52523437 154.93039062 120.88671875 154.89453125 C124.05069097 154.87112719 127.2146535 154.8529154 130.37866211 154.83520508 C132.57564621 154.82012948 134.77260026 154.79966574 136.96948242 154.77368164 C140.12947 154.73724498 143.28905924 154.72026116 146.44921875 154.70703125 C147.91979988 154.68380547 147.91979988 154.68380547 149.42008972 154.66011047 C155.66306293 154.65857381 159.0765136 155.46631179 163.875 159.625 C165.67939414 163.43427651 165.09501562 167.00209061 164 171 C161.75410675 173.99452434 160.55130633 174.81623122 157 176 C155.44024881 176.09947413 153.87665187 176.14350139 152.31376648 176.15390015 C150.86914536 176.16680084 150.86914536 176.16680084 149.39533997 176.17996216 C148.34021713 176.18422211 147.2850943 176.18848206 146.19799805 176.19287109 C145.08553711 176.20104858 143.97307617 176.20922607 142.8269043 176.21765137 C139.13851461 176.2425029 135.45016337 176.2590196 131.76171875 176.2734375 C130.50321421 176.27876118 129.24470966 176.28408485 127.94806862 176.28956985 C122.65940906 176.31079697 117.37075527 176.32992729 112.08206463 176.34119225 C104.5099254 176.35742891 96.93829944 176.3906072 89.36635369 176.44759309 C83.39537731 176.49099426 77.42451524 176.50694035 71.45337868 176.51332474 C68.91562048 176.52004887 66.3778701 176.53530082 63.84021568 176.55921555 C60.28980701 176.59076918 56.74069714 176.59091792 53.19018555 176.58349609 C52.14113541 176.59990143 51.09208527 176.61630676 50.01124573 176.63320923 C45.40157823 176.59374052 42.05074243 176.56127426 38.3618927 173.60391235 C35.37556546 170.31158058 34.91720764 168.52249614 34.6875 164.22265625 C35.23528501 160.32653534 37.16101017 158.64092077 40 156 C42.39582346 154.80208827 43.86777538 154.8793256 46.54150391 154.88647461 C47.48232819 154.88655014 48.42315247 154.88662567 49.39248657 154.88670349 C50.41023163 154.89186478 51.42797668 154.89702606 52.4765625 154.90234375 C54.03713882 154.90446617 54.03713882 154.90446617 55.62924194 154.90663147 C58.96119021 154.91224134 62.29307195 154.92479553 65.625 154.9375 C67.88020736 154.94251373 70.13541578 154.94707686 72.390625 154.95117188 C77.92712975 154.96136426 83.46349017 154.9809378 89 155 C89 144.77 89 134.54 89 124 C83.555 123.505 83.555 123.505 78 123 C50.2450228 118.50606785 24.57550623 101.40169471 8 79 C-6.17032116 59.1639511 -18.46131918 31.97360396 -15 7 C-11.61041298 0.09160417 -7.24944534 -1.06833931 0 0 Z " fill="#FCFDFE" transform="translate(156,247)"/>
                                </svg>
                            </button>
                            <button class="send-button" style="display: none;">
                                <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                    width="24" height="24" viewBox="0 0 512.000000 512.000000"
                                    preserveAspectRatio="xMidYMid meet">
                                    <metadata>
                                    Created by potrace 1.16, written by Peter Selinger 2001-2019
                                    </metadata>
                                    <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                                    fill="#007BFF" stroke="none">
                                    <path d="M130 5098 c-46 -30 -70 -81 -70 -143 0 -50 424 -1964 438 -1976 5 -4
                                    1574 -278 2270 -396 56 -10 102 -20 102 -23 0 -3 -46 -13 -102 -23 -731 -124
                                    -2265 -392 -2270 -396 -14 -12 -438 -1926 -438 -1976 0 -61 25 -112 71 -143
                                    30 -21 43 -23 104 -20 l70 4 2315 1188 c1273 653 2334 1199 2357 1212 110 63
                                    110 245 0 308 -23 13 -1084 559 -2357 1212 l-2315 1188 -70 4 c-61 3 -75 1
                                    -105 -20z"/>
                                    </g>
                                </svg>

                            </button>
                        </div>
                        <input type="file" class="file-input" multiple />
                    </div>
                </div>
                <div class="chat-footer">
                    <a href="${config.branding.poweredBy.link}" target="_blank" style="display: inline-flex; align-items: center; gap: 6px;">
                        ${
                            config.branding.poweredBy.logo
                            ? `<img src="${config.branding.poweredBy.logo}" alt="Logo" style="height: 20px; vertical-align: middle;">`
                            : `<span style="height: 20px; display: inline-block; vertical-align: middle;">` +
                            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" style="height: 18px; vertical-align: middle;"><defs><style>.cls-1{fill:url(#linear-gradient);}.cls-2{opacity:0.2;}.cls-3{opacity:0.7;}.cls-4{fill:url(#linear-gradient-2);}.cls-5{fill:url(#linear-gradient-3);}</style><linearGradient id="linear-gradient" x1="91.03" y1="137.01" x2="147.75" y2="89.42" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ee743b"/><stop offset="1" stop-color="#f7d21e"/></linearGradient><linearGradient id="linear-gradient-2" x1="43.85" y1="104.81" x2="200" y2="104.81" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#007bc1"/><stop offset="1" stop-color="#09f"/></linearGradient><linearGradient id="linear-gradient-3" x1="16.25" y1="166.54" x2="179.81" y2="29.29" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#017cc1"/><stop offset="1" stop-color="#09f"/></linearGradient></defs><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path class="cls-1" d="M145.05,154.81c-14.32,7.21-20.35-1.08-20.37-1.1a15.46,15.46,0,0,1-4.25-10.57V56.86a25,25,0,0,0-25,25v58.2C107.46,165.46,133,162.73,145.05,154.81Z"/><g class="cls-2"><path class="cls-3" d="M124.68,153.72a15.24,15.24,0,0,1-2.85-4.25,28.54,28.54,0,0,1-26.4-10.12v.72c12,25.4,37.51,21.91,49.57,14C132,162.46,124.7,153.74,124.68,153.72Z"/></g><path class="cls-4" d="M174.69,36.9c-32.06-23.18-81.57-12-110.6,25C48.28,82,41.84,105.64,44.4,126.73,43.6,104.83,54.45,80.14,75,62.07c31.08-27.33,72.55-29.18,92.62-4.14,14.18,17.7,14,44.25,1.63,67.83a92.26,92.26,0,0,1-19.45,25.12,34.46,34.46,0,0,1-4.77,3h0c-8,4.75-16.81,6.69-25.3,5.07-16.82-3-23.38-17.89-24.32-19.85v7.73h0c0,.09,0,.18,0,.27a40,40,0,0,0,13.45,30c.35.33.72.64,1.08.94l.11.09c.32.27.66.53,1,.78,11,8.26,25.53,7.41,37.94.24,9.05-5.23,16.75-12.42,25.4-23l.85-1C209.9,110.29,206.74,60.08,174.69,36.9Z"/><path class="cls-5" d="M100.44,180.51C89,181.73,64.27,179,47.64,167a70.45,70.45,0,0,1-17.78-19.19c-16.22-25.84-7.69-55.38-4.59-64.3,9-29.17,31-48.28,39.47-54.52,9.6-7.06,29.11-18.5,54.22-20.46C150.16,7,167.39,19.37,175.33,24,154.13,3.49,131.27.36,117.05.07,89-1,68.55,9.93,57.65,16.47,53,19.28,28.84,34.15,13.94,62.52A112.5,112.5,0,0,0,2.57,92.45c-1.84,8.44-7.65,37.11,8.17,65.2a82.49,82.49,0,0,0,22.15,25.63,88.77,88.77,0,0,0,31.76,14.63c30.37,5.78,51.86-1.9,60.26-5.44C120.16,192.35,111,191.83,100.44,180.51Z"/></g></g></svg>` +
                            `</span>`
                        }
                        ${config.branding.poweredBy.text}
                    </a>
                </div>
            </div>
        `;
        
        chatContainer.innerHTML = chatInterfaceHTML;
        // let video = 'on'; // Default state
		// document.addEventListener('DOMContentLoaded', () => {
        //     const toggleInput = document.getElementById('videoToggle');
            

        //     toggleInput.addEventListener('change', () => {
        //         video = toggleInput.checked ? 'on' : 'off';
        //         console.log('Video state:', video); // You can store this value as needed
        //     });
        // });

		
        
        
        // // After the refreshButton event listener
		// const fullscreenButton = chatContainer.querySelector('.fullscreen-button');
		// let isFullscreen = false;
		// let originalStyles = {};

		// fullscreenButton.addEventListener('click', () => {
		// 	if (!isFullscreen) {
		// 		// Save original styles
		// 		originalStyles = {
		// 			width: chatContainer.style.width || '380px',
		// 			height: chatContainer.style.height || '450px',
		// 			left: chatContainer.style.left || '',
		// 			top: chatContainer.style.top || '',
		// 			right: chatContainer.style.right || '20px',
		// 			bottom: chatContainer.style.bottom || '20px',
		// 			position: chatContainer.style.position || 'fixed'
		// 		};

		// 		// Apply full-screen styles
		// 		chatContainer.style.width = '100%';
		// 		chatContainer.style.height = '100%';
		// 		chatContainer.style.left = '0';
		// 		chatContainer.style.top = '0';
		// 		chatContainer.style.right = '100%';
		// 		chatContainer.style.bottom = '100%';
		// 		chatContainer.style.borderRadius = '0';
		// 		chatContainer.style.boxShadow = 'none';

		// 		// Update button icon to "minimize"
		// 		fullscreenButton.innerHTML = `
		// 			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->\
		// 				<path d="M439 7c9.4-9.4 24.6-9.4 33.9 0l32 32c9.4 9.4 9.4 24.6 0 33.9l-87 87 39 39c6.9 6.9 8.9 17.2 5.2 26.2s-12.5 14.8-22.2 14.8l-144 0c-13.3 0-24-10.7-24-24l0-144c0-9.7 5.8-18.5 14.8-22.2s19.3-1.7 26.2 5.2l39 39L439 7zM72 272l144 0c13.3 0 24 10.7 24 24l0 144c0 9.7-5.8 18.5-14.8 22.2s-19.3 1.7-26.2-5.2l-39-39L73 505c-9.4 9.4-24.6 9.4-33.9 0L7 473c-9.4-9.4-9.4-24.6 0-33.9l87-87L55 313c-6.9-6.9-8.9-17.2-5.2-26.2s12.5-14.8 22.2-14.8z"/>
		// 			</svg>
		// 		`;
		// 		fullscreenButton.title = 'Minimize';
		// 		isFullscreen = true;
		// 	} else {
		// 		// Restore original styles
		// 		chatContainer.style.width = originalStyles.width;
		// 		chatContainer.style.height = originalStyles.height;
		// 		chatContainer.style.left = originalStyles.left;
		// 		chatContainer.style.top = originalStyles.top;
		// 		chatContainer.style.right = originalStyles.right;
		// 		chatContainer.style.bottom = originalStyles.bottom;
		// 		chatContainer.style.position = originalStyles.position;
		// 		chatContainer.style.borderRadius = '12px';
		// 		chatContainer.style.boxShadow = '0 8px 32px rgba(133, 79, 255, 0.15)';

		// 		// Restore full-screen button icon
		// 		fullscreenButton.innerHTML = `
		// 			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
		// 				<path d="M344 0L488 0c13.3 0 24 10.7 24 24l0 144c0 9.7-5.8 18.5-14.8 22.2s-19.3 1.7-26.2-5.2l-39-39-87 87c-9.4 9.4-24.6 9.4-33.9 0l-32-32c-9.4-9.4-9.4-24.6 0-33.9l87-87L327 41c-6.9-6.9-8.9-17.2-5.2-26.2S334.3 0 344 0zM168 512L24 512c-13.3 0-24-10.7-24-24L0 344c0-9.7 5.8-18.5 14.8-22.2s19.3-1.7 26.2 5.2l39 39 87-87c9.4-9.4 24.6-9.4 33.9 0l32 32c9.4 9.4 9.4 24.6 0 33.9l-87 87 39 39c6.9 6.9 8.9 17.2 5.2 26.2s-12.5 14.8-22.2 14.8z"/>
		// 			</svg>

		// 		`;
		// 		fullscreenButton.title = 'Toggle Fullscreen';
		// 		isFullscreen = true;
		// 	}
		// });






		const toggleButton = document.createElement('button');
		toggleButton.className = `chat-toggle${config.style.position === 'left' ? ' position-left' : ''}`;

		// toggleButton.innerHTML = `
        // <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        //     <path d="M12 2C6.477 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5L2.5 21.5l4.5-.838A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.476 0-2.886-.313-4.156-.878l-3.156.586.586-3.156A7.962 7.962 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
        // </svg>`;
        
        toggleButton.innerHTML =
        `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 70 70" preserveAspectRatio="xMidYMid meet">
            <path d="M0 0 C9.88869366 5.81586346 16.18371269 13.07946401 19.23828125 24.31640625 C20.38735482 37.08982869 18.61354015 47.16824221 10.296875 57.2734375 C3.21022892 64.30629499 -5.61611128 67.71862775 -15.51171875 67.69140625 C-26.47606606 67.63253223 -34.98655606 64.15103481 -42.76171875 56.31640625 C-50.24991451 46.1985229 -51.71146652 36.5669503 -50.76171875 24.31640625 C-48.94192176 16.08918036 -44.07411436 8.50798906 -37.296875 3.4921875 C-26.19180869 -3.40464315 -12.20554198 -5.88737907 0 0 Z " fill="#FEFEFE" transform="translate(50.76171875,2.68359375)"/>
            <path d="M0 0 C1.32 0 2.64 0 4 0 C4 2.31 4 4.62 4 7 C4.65226562 7.07476563 5.30453125 7.14953125 5.9765625 7.2265625 C12.62973359 8.22748204 15.80055993 9.69544413 20 15 C20 15.66 20 16.32 20 17 C21.32 17.66 22.64 18.32 24 19 C24 21.97 24 24.94 24 28 C23.195625 28.2475 22.39125 28.495 21.5625 28.75 C20.716875 29.1625 19.87125 29.575 19 30 C18.855625 30.61875 18.71125 31.2375 18.5625 31.875 C17.82539045 34.65963607 16.34991101 35.51720785 13.95703125 36.984375 C4.29230769 42 4.29230769 42 0 42 C0 40.35 0 38.7 0 37 C-0.515625 37.185625 -1.03125 37.37125 -1.5625 37.5625 C-5.06715697 38.19154099 -7.54853876 37.90827927 -11 37 C-13.625 34.1875 -13.625 34.1875 -16 31 C-16.928125 30.38125 -17.85625 29.7625 -18.8125 29.125 C-21.30086974 26.70772653 -21.35405417 26.18899169 -21.4375 22.875 C-21 19 -21 19 -19 17 C-18.01 17 -17.02 17 -16 17 C-15.773125 16.236875 -15.54625 15.47375 -15.3125 14.6875 C-13.66784972 11.31988277 -12.40460849 10.51315933 -9 9 C-6.67724823 8.59952556 -4.34260643 8.2602896 -2 8 C-1.01 7.67 -0.02 7.34 1 7 C0.34 5.02 -0.32 3.04 -1 1 C-0.67 0.67 -0.34 0.34 0 0 Z " fill="#CFD1D3" transform="translate(34,13)"/>
            <path d="M0 0 C1.58748047 -0.0299707 1.58748047 -0.0299707 3.20703125 -0.06054688 C4.72876953 -0.05958008 4.72876953 -0.05958008 6.28125 -0.05859375 C7.6744043 -0.06137329 7.6744043 -0.06137329 9.09570312 -0.06420898 C11.5 0.4375 11.5 0.4375 13.3034668 2.30029297 C14.82430072 5.01675494 14.86729985 6.90170081 14.8125 10 C14.80863281 10.95003906 14.80476563 11.90007813 14.80078125 12.87890625 C14.5 15.4375 14.5 15.4375 12.5 18.4375 C8.4951979 19.880311 4.26936741 19.62140746 0.0625 19.625 C-0.68837891 19.63724609 -1.43925781 19.64949219 -2.21289062 19.66210938 C-6.39120456 19.67313395 -9.74381715 19.50014376 -13.5 17.4375 C-14.85281371 14.73187257 -14.70609362 12.51856345 -14.75 9.5 C-14.77578125 8.43910156 -14.8015625 7.37820312 -14.828125 6.28515625 C-14.5 3.4375 -14.5 3.4375 -13.30566406 1.78662109 C-9.60321762 -0.97970111 -4.44163789 -0.02975519 0 0 Z " fill="#071942" transform="translate(35.5,26.5625)"/>
            <path d="M0 0 C1.61648437 0.04060547 1.61648437 0.04060547 3.265625 0.08203125 C4.08546875 0.11683594 4.9053125 0.15164062 5.75 0.1875 C5.75 1.5075 5.75 2.8275 5.75 4.1875 C4.90695313 4.30867188 4.06390625 4.42984375 3.1953125 4.5546875 C2.09960938 4.72226562 1.00390625 4.88984375 -0.125 5.0625 C-1.76082031 5.30613281 -1.76082031 5.30613281 -3.4296875 5.5546875 C-6.36932714 5.95006513 -6.36932714 5.95006513 -8.25 8.1875 C-8.49377883 11.54494112 -8.49377883 11.54494112 -8.375 15.3125 C-8.33375 17.58125 -8.2925 19.85 -8.25 22.1875 C-3.63 22.8475 0.99 23.5075 5.75 24.1875 C5.75 25.5075 5.75 26.8275 5.75 28.1875 C1.1102235 29.20598752 -2.63837828 29.44521501 -7.25 28.1875 C-9.875 25.375 -9.875 25.375 -12.25 22.1875 C-13.178125 21.56875 -14.10625 20.95 -15.0625 20.3125 C-17.55086974 17.89522653 -17.60405417 17.37649169 -17.6875 14.0625 C-17.25 10.1875 -17.25 10.1875 -15.25 8.1875 C-14.26 8.1875 -13.27 8.1875 -12.25 8.1875 C-12.0025 7.424375 -11.755 6.66125 -11.5 5.875 C-8.97012756 0.43577426 -5.73182886 -0.18690746 0 0 Z " fill="#E6E8EA" transform="translate(30.25,21.8125)"/>
            <path d="M0 0 C0 2.31 0 4.62 0 7 C0.66 7 1.32 7 2 7 C2 4.69 2 2.38 2 0 C2.99 0.33 3.98 0.66 5 1 C5.3125 3.6875 5.3125 3.6875 5 7 C2.6875 9.875 2.6875 9.875 0 12 C-0.99 12 -1.98 12 -3 12 C-4.52491998 8.95016004 -4.23562548 6.3576631 -4 3 C-1.77419355 0 -1.77419355 0 0 0 Z " fill="#122B5D" transform="translate(25,32)"/>
            <path d="M0 0 C0.66 0 1.32 0 2 0 C2 3.96 2 7.92 2 12 C0.68 11.34 -0.64 10.68 -2 10 C-2.1953125 3.9453125 -2.1953125 3.9453125 -2 2 C-1.34 1.34 -0.68 0.68 0 0 Z " fill="#46C2FC" transform="translate(15,30)"/>
            <path d="M0 0 C3.53571429 0.53571429 3.53571429 0.53571429 5 2 C5.04092937 4.33297433 5.04241723 6.66705225 5 9 C4.34 9 3.68 9 3 9 C2.67 7.02 2.34 5.04 2 3 C1.67 3 1.34 3 1 3 C0.67 4.98 0.34 6.96 0 9 C-0.66 9 -1.32 9 -2 9 C-2.125 5.625 -2.125 5.625 -2 2 C-1.34 1.34 -0.68 0.68 0 0 Z " fill="#35BAF7" transform="translate(42,30)"/>
            <path d="M0 0 C1.32 0 2.64 0 4 0 C3.95875 1.11375 3.9175 2.2275 3.875 3.375 C3.58878141 7.04366025 3.58878141 7.04366025 6 9 C3.36 9 0.72 9 -2 9 C-1.67 8.34 -1.34 7.68 -1 7 C-0.34 7 0.32 7 1 7 C0.34 5.02 -0.32 3.04 -1 1 C-0.67 0.67 -0.34 0.34 0 0 Z " fill="#3090DA" transform="translate(34,13)"/>
            <path d="M0 0 C2.475 0.99 2.475 0.99 5 2 C5 4.31 5 6.62 5 9 C4.34 9 3.68 9 3 9 C2.87625 8.030625 2.7525 7.06125 2.625 6.0625 C2.315625 4.5465625 2.315625 4.5465625 2 3 C1.34 2.67 0.68 2.34 0 2 C0 4.31 0 6.62 0 9 C-0.66 9 -1.32 9 -2 9 C-2.125 5.625 -2.125 5.625 -2 2 C-1.34 1.34 -0.68 0.68 0 0 Z " fill="#35BBF8" transform="translate(27,30)"/>
            <path d="M0 0 C1.98 0.99 1.98 0.99 4 2 C4 4.97 4 7.94 4 11 C3.01 11.33 2.02 11.66 1 12 C0.67 8.04 0.34 4.08 0 0 Z " fill="#3683E7" transform="translate(54,30)"/>
            <path d="M0 0 C-2.07143201 4.03384128 -3.96615872 5.92856799 -8 8 C-8.36075949 3.55063291 -8.36075949 3.55063291 -6.8125 1.1875 C-4.44017475 -0.36678206 -2.77958655 -0.22537188 0 0 Z " fill="#152E62" transform="translate(29,27)"/>
            <path d="M0 0 C0 2.64 0 5.28 0 8 C-1.98 8.99 -1.98 8.99 -4 10 C-4.36814024 3.49618902 -4.36814024 3.49618902 -2.5625 1.0625 C-1 0 -1 0 0 0 Z " fill="#06163E" transform="translate(25,32)"/>
            <path d="M0 0 C1.9453125 -0.29296875 1.9453125 -0.29296875 4.125 -0.1875 C5.40375 -0.125625 6.6825 -0.06375 8 0 C6.68 1.65 5.36 3.3 4 5 C2.02 4.34 0.04 3.68 -2 3 C-1.34 2.01 -0.68 1.02 0 0 Z " fill="#071B44" transform="translate(29,27)"/>
            <path d="M0 0 C1.32 0.33 2.64 0.66 4 1 C1.36 3.64 -1.28 6.28 -4 9 C-4.33 7.68 -4.66 6.36 -5 5 C-2.8125 2.1875 -2.8125 2.1875 0 0 Z " fill="#152E63" transform="translate(37,27)"/>
            <path d="M0 0 C-2.6860286 1.79068573 -4.6626589 2.66055791 -7.6875 3.625 C-8.49574219 3.88539062 -9.30398437 4.14578125 -10.13671875 4.4140625 C-10.75160156 4.60742188 -11.36648437 4.80078125 -12 5 C-12 3.68 -12 2.36 -12 1 C-7.9472484 0.01751476 -4.16138263 -0.08159574 0 0 Z " fill="#BEC5CB" transform="translate(46,50)"/>
            <path d="M0 0 C1.98 0 3.96 0 6 0 C5.6875 1.9375 5.6875 1.9375 5 4 C4.01 4.33 3.02 4.66 2 5 C1.01 4.01 0.02 3.02 -1 2 C-0.67 1.34 -0.34 0.68 0 0 Z " fill="#30A9E4" transform="translate(33,38)"/>
        </svg>`
		
		const resizeHandle = document.createElement('div');
		speechSynthesis.cancel();
		resizeHandle.className = 'resize-handle';
		chatContainer.appendChild(resizeHandle);

		widgetContainer.appendChild(chatContainer);
		widgetContainer.appendChild(toggleButton);
		document.body.appendChild(widgetContainer);

		const messagesContainer = chatContainer.querySelector('.chat-messages');
        const textarea = chatContainer.querySelector('textarea');
		const sendButton = chatContainer.querySelector('.send-button');
		const micButton = chatContainer.querySelector('.mic-button');
		const fileInput = chatContainer.querySelector('.file-input');
		const fileUploadButton = chatContainer.querySelector('.file-upload-button');
		const filePreviewContainer = chatContainer.querySelector('#file-preview-container');
		const refreshButton = chatContainer.querySelector('.refresh-button');





    function clampChatPosition() {
        const chat = document.querySelector('.chat-container');
        
        // Don't clamp position if chat is hidden/closed
        if (!chat || chat.style.display === 'none' || !chat.offsetParent) {
            return;
        }
        
        const rect = chat.getBoundingClientRect();
        const buffer = 10;
        
        // Check if chat is currently positioned from the right
        const isRightPositioned = chat.style.right !== 'auto' && chat.style.right !== '';
        
        if (isRightPositioned) {
            // Maintain right-side positioning
            const currentRight = parseInt(chat.style.right) || 0;
            const newTop = Math.max(buffer, Math.min(window.innerHeight - rect.height - buffer, rect.top));
            const newRight = Math.max(buffer, currentRight);
            
            // Make sure it doesn't go off the left side
            const maxRight = Math.max(buffer, window.innerWidth - rect.width - buffer);
            const clampedRight = Math.min(newRight, maxRight);
            
            chat.style.top = `${newTop}px`;
            chat.style.right = `${clampedRight}px`;
            chat.style.left = 'auto';
            chat.style.bottom = 'auto';
        } else {
            // Use left-side positioning
            let newTop = Math.max(buffer, Math.min(window.innerHeight - rect.height - buffer, rect.top));
            let newLeft = Math.max(buffer, Math.min(window.innerWidth - rect.width - buffer, rect.left));
            
            chat.style.inset = 'auto auto auto auto';
            chat.style.top = `${newTop}px`;
            chat.style.left = `${newLeft}px`;
            chat.style.right = 'auto';
            chat.style.bottom = 'auto';
        }
    }

    // Clamp on mouseup (when user drags)
    document.querySelector('.chat-container').addEventListener('mouseup', clampChatPosition);

    // Also clamp on resize to prevent going off-screen
    window.addEventListener('resize', clampChatPosition);




        
		function generateUUID() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                const r = Math.random() * 16 | 0;
                const v = c === 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }

		function autoResizeTextarea(textarea) {
			textarea.style.height = 'auto';
			if (textarea.value.trim() === '') {
				textarea.style.height = '40px'; // Set a default height when empty
			} else {
				textarea.style.height = `${textarea.scrollHeight}px`;
			}
		}

		function updateButtonVisibility() {
			const hasInput = textarea.value.trim().length > 0 || currentFiles.length > 0;
			sendButton.style.display = hasInput ? 'flex' : 'none';
			micButton.style.display = hasInput && !isRecording ? 'none' : 'flex';
		}

        // // Attach history recall logic AFTER chatContainer.innerHTML

        const messageHistory = [];
        let historyIndex = -1;

        textarea.addEventListener('keydown', function (e) {
            if (e.key === 'ArrowUp') {
                if (messageHistory.length > 0) {
                    historyIndex = Math.max(0, historyIndex - 1);
                    textarea.value = messageHistory[historyIndex];
                    e.preventDefault();
                }
            }

            if (e.key === 'ArrowDown') {
                if (messageHistory.length > 0) {
                    historyIndex = Math.min(messageHistory.length, historyIndex + 1);
                    textarea.value = historyIndex === messageHistory.length ? '' : messageHistory[historyIndex];
                    e.preventDefault();
                }
            }

            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                const message = textarea.value.trim();
                if (message || currentFiles.length > 0) {
                    sendMessage(message, currentFiles);
                    textarea.value = '';
                    autoResizeTextarea(textarea); // Add this line to reset the size
                    currentFiles = [];
                    updateButtonVisibility();
                    renderFilePreviews();
                }
            }
        });

 

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



		function escapeHtml(text) {
			return text.replace(/[&<>"']/g, function(m) {
				return ({
					'&': '&amp;',
					'<': '&lt;',
					'>': '&gt;',
					'"': '&quot;',
					"'": '&apos;'
				})[m];
			});
		}

		// Enhanced formatter to support code blocks
		function formatBotMessage(message) {
			const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
			let lastIndex = 0;
			let result = '';
			let match;
			let codeBlockId = 0;

			while ((match = codeBlockRegex.exec(message)) !== null) {
				const before = message.slice(lastIndex, match.index);
				result += before
					.split('\n')
					.map(line => line.trim() ? `<div>${escapeHtml(line)}</div>` : '')
					.join('');
				const lang = match[1] ? match[1] : '';
				const code = escapeHtml(match[2]);
				const thisId = `code-block-${Date.now()}-${codeBlockId++}`;
				result += `
					<div class="chat-code-block-wrapper">
						<button class="copy-code-btn" data-target="${thisId}" title="Copy code">
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24">
								<rect x="9" y="9" width="13" height="13" rx="2" fill="#fff" stroke="#333" stroke-width="2"/>
								<rect x="2" y="2" width="13" height="13" rx="2" fill="#fff" stroke="#333" stroke-width="2"/>
							</svg>
						</button>
						<pre class="chat-code-block"><code id="${thisId}"${lang ? ` class="language-${lang}"` : ''}>${code}</code></pre>
					</div>
				`;
				lastIndex = codeBlockRegex.lastIndex;
			}
			const after = message.slice(lastIndex);
			result += after
				.split('\n')
				.map(line => line.trim() ? `<div>${escapeHtml(line)}</div>` : '')
				.join('');
			return result;
		}



 

    let socket;
    let globalAvatar;       

    // Function to update the branding message based on video state
    function updateBrandingMessage(videoState) {
        // Remove existing branding message if it exists
        const existingBranding = document.querySelector('.chat-branding-message, .chat-branding-message-video-off');
        if (existingBranding) {
            existingBranding.remove();
        }

        // Create new branding message
        const brandingMessageDiv = document.createElement('div');
        brandingMessageDiv.className = videoState === 'on' ? 'chat-branding-message' : 'chat-branding-message-video-off';

        if (videoState === 'on') {
            const avatarContainer = document.createElement('div');
            avatarContainer.id = 'chat-avatar-container';
            avatarContainer.style.height = '250px';
            avatarContainer.style.margin = '0 auto';
            avatarContainer.style.background = 'transparent';
            
            brandingMessageDiv.appendChild(avatarContainer);
            messagesContainer.insertBefore(brandingMessageDiv, messagesContainer.firstChild);

            try {
                globalAvatar = new Avatar3D(avatarContainer, {
                    modelPath: 'model.glb',
                    scale: 7,
                    enableAudio: true,
                    enableBlinking: true,
                });
                // globalAvatar.speak("Hi, I am AARYA Automated AI Responder at Your Assistance How can I assist you today?");
            } catch (error) {
                console.error('Avatar failed:', error);
                avatarContainer.innerHTML = `
                    <div style="width:100%; height:100%; background:linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                                display:flex; align-items:center; justify-content:center;
                                border-radius:12px; color:white; font-weight:bold;">
                        🤖 Virtual Assistant
                    </div>
                `;
            }
        } else {
            globalAvatar = null; // Clear the global avatar reference
            brandingMessageDiv.innerHTML = `
                <span style="display:inline-block; width:64px; height:64px; border-radius:50%; overflow:hidden; background:#fff; margin-bottom:8px;">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="54" height="56">
                        <path d="M0 0 C0 1.32 0 2.64 0 4 C-0.66 4 -1.32 4 -2 4 C-2 4.99 -2 5.98 -2 7 C-1.26394531 7.09796875 -0.52789063 7.1959375 0.23046875 7.296875 C10.33390242 8.84508941 10.33390242 8.84508941 14 13 C14.8125 15.25 14.8125 15.25 15 17 C16.32 17.33 17.64 17.66 19 18 C19 21.63 19 25.26 19 29 C18.01 29.33 17.02 29.66 16 30 C14.79117904 32.00016466 14.79117904 32.00016466 14 34 C13.34 34 12.68 34 12 34 C12 34.66 12 35.32 12 36 C9.73192796 37.0067004 7.46092246 38.00551766 5.1875 39 C4.54490234 39.28617188 3.90230469 39.57234375 3.24023438 39.8671875 C0.32243531 41.13711041 -1.78265714 42 -5 42 C-5 40.68 -5 39.36 -5 38 C-5.75925781 37.95101562 -6.51851562 37.90203125 -7.30078125 37.8515625 C-8.29464844 37.77679688 -9.28851562 37.70203125 -10.3125 37.625 C-11.29863281 37.55539063 -12.28476562 37.48578125 -13.30078125 37.4140625 C-16 37 -16 37 -19 35 C-19 34.34 -19 33.68 -19 33 C-19.66 33 -20.32 33 -21 33 C-21 32.01 -21 31.02 -21 30 C-21.639375 29.87625 -22.27875 29.7525 -22.9375 29.625 C-23.9584375 29.315625 -23.9584375 29.315625 -25 29 C-26.20272819 26.59454362 -26.10071472 25.05003047 -26.0625 22.375 C-26.05347656 21.55773437 -26.04445313 20.74046875 -26.03515625 19.8984375 C-26.02355469 19.27195312 -26.01195312 18.64546875 -26 18 C-25.03900391 17.82597656 -25.03900391 17.82597656 -24.05859375 17.6484375 C-23.37925781 17.43445313 -22.69992188 17.22046875 -22 17 C-21.690625 16.21625 -21.38125 15.4325 -21.0625 14.625 C-19.62590758 11.07577167 -18.52451269 10.51050544 -15 9 C-11.35427854 8.17842897 -7.69568037 7.55014506 -4 7 C-4 6.01 -4 5.02 -4 4 C-4.66 4 -5.32 4 -6 4 C-6 2.68 -6 1.36 -6 0 C-3.50907189 -1.24546405 -2.58919267 -0.7767578 0 0 Z " fill="#CACDD0" transform="translate(31,7)"/>
                        <path d="M0 0 C1.58748047 -0.0299707 1.58748047 -0.0299707 3.20703125 -0.06054688 C4.72876953 -0.05958008 4.72876953 -0.05958008 6.28125 -0.05859375 C7.6744043 -0.06137329 7.6744043 -0.06137329 9.09570312 -0.06420898 C11.5 0.4375 11.5 0.4375 13.3034668 2.30029297 C14.82430072 5.01675494 14.86729985 6.90170081 14.8125 10 C14.80863281 10.95003906 14.80476563 11.90007813 14.80078125 12.87890625 C14.5 15.4375 14.5 15.4375 12.5 18.4375 C8.4951979 19.880311 4.26936741 19.62140746 0.0625 19.625 C-0.68837891 19.63724609 -1.43925781 19.64949219 -2.21289062 19.66210938 C-6.39120456 19.67313395 -9.74381715 19.50014376 -13.5 17.4375 C-14.85281371 14.73187257 -14.70609362 12.51856345 -14.75 9.5 C-14.77578125 8.43910156 -14.8015625 7.37820312 -14.828125 6.28515625 C-14.5 3.4375 -14.5 3.4375 -13.30566406 1.78662109 C-9.60321762 -0.97970111 -4.44163789 -0.02975519 0 0 Z " fill="#071942" transform="translate(27.5,20.5625)"/>
                        <path d="M0 0 C1.60294922 0.04060547 1.60294922 0.04060547 3.23828125 0.08203125 C4.04652344 0.11683594 4.85476562 0.15164063 5.6875 0.1875 C5.6875 1.5075 5.6875 2.8275 5.6875 4.1875 C4.84445313 4.30867188 4.00140625 4.42984375 3.1328125 4.5546875 C2.03710938 4.72226562 0.94140625 4.88984375 -0.1875 5.0625 C-1.82332031 5.30613281 -1.82332031 5.30613281 -3.4921875 5.5546875 C-6.43182714 5.95006513 -6.43182714 5.95006513 -8.3125 8.1875 C-8.55627883 11.54494112 -8.55627883 11.54494112 -8.4375 15.3125 C-8.39625 17.58125 -8.355 19.85 -8.3125 22.1875 C-3.6925 22.8475 0.9275 23.5075 5.6875 24.1875 C5.6875 25.5075 5.6875 26.8275 5.6875 28.1875 C0.02975575 29.36619672 -3.81360636 29.08367022 -9.3125 27.1875 C-9.6425 26.1975 -9.9725 25.2075 -10.3125 24.1875 C-10.9725 24.1875 -11.6325 24.1875 -12.3125 24.1875 C-12.3125 23.1975 -12.3125 22.2075 -12.3125 21.1875 C-12.951875 21.06375 -13.59125 20.94 -14.25 20.8125 C-15.2709375 20.503125 -15.2709375 20.503125 -16.3125 20.1875 C-17.51522819 17.78204362 -17.41321472 16.23753047 -17.375 13.5625 C-17.36597656 12.74523438 -17.35695313 11.92796875 -17.34765625 11.0859375 C-17.33605469 10.45945312 -17.32445312 9.83296875 -17.3125 9.1875 C-16.67183594 9.07148438 -16.03117187 8.95546875 -15.37109375 8.8359375 C-14.69175781 8.62195312 -14.01242188 8.40796875 -13.3125 8.1875 C-13.003125 7.40375 -12.69375 6.62 -12.375 5.8125 C-10.12962936 0.26511373 -5.4692016 -0.18030335 0 0 Z " fill="#E1E3E5" transform="translate(22.3125,15.8125)"/>
                        <path d="M0 0 C0 2.31 0 4.62 0 7 C0.66 7 1.32 7 2 7 C2 4.69 2 2.38 2 0 C2.99 0.33 3.98 0.66 5 1 C5.3125 3.6875 5.3125 3.6875 5 7 C2.6875 9.875 2.6875 9.875 0 12 C-0.99 12 -1.98 12 -3 12 C-4.52491998 8.95016004 -4.23562548 6.3576631 -4 3 C-1.77419355 0 -1.77419355 0 0 0 Z " fill="#122B5D" transform="translate(17,26)"/>
                        <path d="M0 0 C0 1.32 0 2.64 0 4 C-0.66 4 -1.32 4 -2 4 C-2 4.99 -2 5.98 -2 7 C-1.01 7.33 -0.02 7.66 1 8 C1 8.33 1 8.66 1 9 C-1.97 9 -4.94 9 -8 9 C-6.68 8.34 -5.36 7.68 -4 7 C-4 6.01 -4 5.02 -4 4 C-4.66 4 -5.32 4 -6 4 C-6 2.68 -6 1.36 -6 0 C-3.50907189 -1.24546405 -2.58919267 -0.7767578 0 0 Z " fill="#2881C5" transform="translate(31,7)"/>
                        <path d="M0 0 C0.99 0 1.98 0 3 0 C3 4.29 3 8.58 3 13 C2.01 12.67 1.02 12.34 0 12 C-1.1898306 9.6203388 -1.13349966 8.08514265 -1.125 5.4375 C-1.12886719 4.22900391 -1.12886719 4.22900391 -1.1328125 2.99609375 C-1 1 -1 1 0 0 Z " fill="#32B6EF" transform="translate(6,24)"/>
                        <path d="M0 0 C3.53571429 0.53571429 3.53571429 0.53571429 5 2 C5.04092937 4.33297433 5.04241723 6.66705225 5 9 C4.34 9 3.68 9 3 9 C2.67 7.02 2.34 5.04 2 3 C1.67 3 1.34 3 1 3 C0.67 4.98 0.34 6.96 0 9 C-0.66 9 -1.32 9 -2 9 C-2.125 5.625 -2.125 5.625 -2 2 C-1.34 1.34 -0.68 0.68 0 0 Z " fill="#35BAF7" transform="translate(34,24)"/>
                        <path d="M0 0 C2.475 0.99 2.475 0.99 5 2 C5 4.31 5 6.62 5 9 C4.34 9 3.68 9 3 9 C2.87625 8.030625 2.7525 7.06125 2.625 6.0625 C2.315625 4.5465625 2.315625 4.5465625 2 3 C1.34 2.67 0.68 2.34 0 2 C0 4.31 0 6.62 0 9 C-0.66 9 -1.32 9 -2 9 C-2.125 5.625 -2.125 5.625 -2 2 C-1.34 1.34 -0.68 0.68 0 0 Z " fill="#35BBF8" transform="translate(19,24)"/>
                        <path d="M0 0 C1.32 0.33 2.64 0.66 4 1 C4 4.63 4 8.26 4 12 C3.01 12 2.02 12 1 12 C0.67 8.04 0.34 4.08 0 0 Z " fill="#2F7ADD" transform="translate(46,24)"/>
                        <path d="M0 0 C-2.07143201 4.03384128 -3.96615872 5.92856799 -8 8 C-8.36075949 3.55063291 -8.36075949 3.55063291 -6.8125 1.1875 C-4.44017475 -0.36678206 -2.77958655 -0.22537188 0 0 Z " fill="#152E62" transform="translate(21,21)"/>
                        <path d="M0 0 C0 2.64 0 5.28 0 8 C-1.98 8.99 -1.98 8.99 -4 10 C-4.36814024 3.49618902 -4.36814024 3.49618902 -2.5625 1.0625 C-1 0 -1 0 0 0 Z " fill="#06163E" transform="translate(17,26)"/>
                        <path d="M0 0 C1.9453125 -0.29296875 1.9453125 -0.29296875 4.125 -0.1875 C5.40375 -0.125625 6.6825 -0.06375 8 0 C6.68 1.65 5.36 3.3 4 5 C2.02 4.34 0.04 3.68 -2 3 C-1.34 2.01 -0.68 1.02 0 0 Z " fill="#071B44" transform="translate(21,21)"/>
                        <path d="M0 0 C1.32 0.33 2.64 0.66 4 1 C1.36 3.64 -1.28 6.28 -4 9 C-4.33 7.68 -4.66 6.36 -5 5 C-2.8125 2.1875 -2.8125 2.1875 0 0 Z " fill="#152E63" transform="translate(29,21)"/>
                        <path d="M0 0 C1.98 0 3.96 0 6 0 C5.6875 1.9375 5.6875 1.9375 5 4 C4.01 4.33 3.02 4.66 2 5 C1.01 4.01 0.02 3.02 -1 2 C-0.67 1.34 -0.34 0.68 0 0 Z " fill="#30A9E4" transform="translate(25,32)"/>
                        <path d="M0 0 C-6.625 3 -6.625 3 -10 3 C-10 2.01 -10 1.02 -10 0 C-3.375 -1.125 -3.375 -1.125 0 0 Z " fill="#D4D6D7" transform="translate(36,46)"/>
                    </svg>
                </span>
                <span>
                    <svg id="Group_83564" data-name="Group 83564" xmlns="http://www.w3.org/2000/svg" width="72.65" height="14.373" viewBox="0 0 72.65 14.373">
                        <g id="Group_32244" data-name="Group 32244" transform="translate(0)">
                            <path id="Path_17646" data-name="Path 17646" d="M-7796.259,5512.06a.531.531,0,0,1-.457-.256l-7.567-12.522-6.972,11.7h6.773a.533.533,0,0,1,.533.531.532.532,0,0,1-.533.532h-7.709a.527.527,0,0,1-.462-.269.536.536,0,0,1,.005-.536l7.906-13.261a.532.532,0,0,1,.455-.261.527.527,0,0,1,.456.258l8.027,13.28a.534.534,0,0,1-.181.731A.543.543,0,0,1-7796.259,5512.06Z" transform="translate(7812.723 -5497.716)" fill="#09f"/>
                            <path id="Path_17643" data-name="Path 17643" d="M-7796.259,5512.06a.531.531,0,0,1-.457-.256l-7.567-12.522-6.972,11.7h6.773a.533.533,0,0,1,.533.531.532.532,0,0,1-.533.532h-7.709a.527.527,0,0,1-.462-.269.536.536,0,0,1,.005-.536l7.906-13.261a.532.532,0,0,1,.455-.261.527.527,0,0,1,.456.258l8.027,13.28a.534.534,0,0,1-.181.731A.543.543,0,0,1-7796.259,5512.06Z" transform="translate(7831.826 -5497.716)" fill="#09f"/>
                            <path id="Path_17641" data-name="Path 17641" d="M-7796.259,5512.06a.531.531,0,0,1-.457-.256l-7.567-12.522-6.972,11.7h6.773a.533.533,0,0,1,.533.531.532.532,0,0,1-.533.532h-7.709a.527.527,0,0,1-.462-.269.536.536,0,0,1,.005-.536l7.906-13.261a.532.532,0,0,1,.455-.261.527.527,0,0,1,.456.258l8.027,13.28a.534.534,0,0,1-.181.731A.543.543,0,0,1-7796.259,5512.06Z" transform="translate(7868.379 -5497.716)" fill="#09f"/>
                            <path id="Path_17644" data-name="Path 17644" d="M-7705.514,5507.717l3.773,6.238,1.012,1.669" transform="translate(7752.841 -5507.162)" fill="#ededed"/>
                            <path id="Path_17644_-_Outline" data-name="Path 17644 - Outline" d="M-7710.2,5506.687a.535.535,0,0,1-.455-.258l-4.786-7.905a.533.533,0,0,1,.177-.731.53.53,0,0,1,.729.18l4.792,7.9a.535.535,0,0,1-.181.73A.53.53,0,0,1-7710.2,5506.687Z" transform="translate(7762.312 -5497.688)" fill="#09f"/>
                            <path id="Path_17642" data-name="Path 17642" d="M-7819.725,5520.979l7.906-13.262" transform="translate(7869.444 -5507.162)" fill="#ededed"/>
                            <path id="Path_17642_-_Outline" data-name="Path 17642 - Outline" d="M-7829.192,5512.042a.537.537,0,0,1-.272-.074.534.534,0,0,1-.185-.73l7.907-13.261a.532.532,0,0,1,.729-.185.531.531,0,0,1,.184.729l-7.906,13.263A.527.527,0,0,1-7829.192,5512.042Z" transform="translate(7878.91 -5497.688)" fill="#09f"/>
                            <path id="Path_17645" data-name="Path 17645" d="M-6875.613,5511.994a.53.53,0,0,1-.457-.255l-3.647-6.052a.529.529,0,0,1-.008-.534.535.535,0,0,1,.46-.273c.146,0,3.6-.073,3.6-3.048a2.978,2.978,0,0,0-3.051-3.047h-4.471a.533.533,0,0,1-.532-.535.532.532,0,0,1,.532-.531h4.476a3.989,3.989,0,0,1,4.109,4.112c0,2.7-2.131,3.752-3.77,4.031l3.209,5.326a.531.531,0,0,1-.182.731A.523.523,0,0,1-6875.613,5511.994Z" transform="translate(6919.279 -5497.621)" fill="#ff9300"/>
                        </g>
                    </svg>
                </span>
            `;
            messagesContainer.insertBefore(brandingMessageDiv, messagesContainer.firstChild);
        }
    }

    // Modified startNewConversation function
    async function startNewConversation() {
        speechSynthesis.cancel();
        currentSessionId = generateUUID();

        // Clear existing messages (optional, depending on whether you want to reset the conversation)
        messagesContainer.innerHTML = '';

        // Add branding message based on initial video state
        updateBrandingMessage(video);

        // Add the bot's greeting message
        const timeWithDate = new Date().toLocaleString([], {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });

        const botMessageDiv1 = document.createElement('div');
        botMessageDiv1.className = 'chat-message bot';
        botMessageDiv1.style.position = 'relative';
        botMessageDiv1.style.background = 'rgb(255, 255, 255)';
        botMessageDiv1.style.borderRadius = '8px';
        botMessageDiv1.style.margin = '10px 0';

        botMessageDiv1.innerHTML = `
            <div class="message-bubble" style="position: relative;">
                <div class="avatar bot-avatar"></div>
                <div class="message-content">
                    Hi<br>
                    I am AARYA (Automated AI Responder at Your Assistance).<br>
                    How can I assist you today?
                </div>
                <div style="position: absolute; top: -20px; right: 10px; font-size: 10px; color: #666;">
                    ${timeWithDate}
                </div>
            </div>
        `;
        messagesContainer.appendChild(botMessageDiv1);    
        if (globalAvatar) {
            globalAvatar.speak("Hi, I am AARYA Automated AI Responder at Your Assistance How can I assist you today?");
        }


        // WebSocket setup
        if (config.wss && config.wss.url) {
            socket = new WebSocket(config.wss.url);
            socket.onopen = () => {
                // console.log('WebSocket connection established');
            };
            socket.onerror = (error) => {
                // console.error('WebSocket error:', error);
            };
            socket.onclose = () => {
                // console.log('WebSocket connection closed');
            };
        } else {
            console.error('WebSocket URL not defined in config');
        }
    }

    let video = 'off';
    // // Set up the chat interface and toggle event listener
    // document.addEventListener('DOMContentLoaded', () => {
    //     const toggleInput = document.getElementById('videoToggle');
        
    //     toggleInput.addEventListener('change', () => {
    //         video = toggleInput.checked ? 'on' : 'off';
    //         console.log('Video state:', video);
    //         updateBrandingMessage(video); // Update branding message when toggle changes
    //     });
    // });



      



        function showImagePopup(imageUrl) {
            const backdrop = document.createElement('div');
            backdrop.className = 'dialog-backdrop';
            document.body.appendChild(backdrop);

            const dialog = document.createElement('div');
            dialog.className = 'image-dialog';

            dialog.innerHTML = `
                <button class="dialog-close-button">×</button>
                <img src="${imageUrl}" class="responsive-popup-image" />
            `;
            document.body.appendChild(dialog);

            const closeDialog = () => {
                dialog.remove();
                backdrop.remove();
            };

            dialog.querySelector('.dialog-close-button').addEventListener('click', closeDialog);
            backdrop.addEventListener('click', closeDialog);
        }



        function enableImagePreview(imgElement, fileUrl) {
            imgElement.style.cursor = 'pointer';
            imgElement.addEventListener('click', () => {
                showImagePopup(fileUrl);
            });
        }

		
        
        
        let abortController = new AbortController();

		async function sendMessage(message, files = []) {
			// console.log('sendMessage called with message:', message, 'and files:', files);

			const formData = new FormData();
			const messageSessionId = currentSessionId; // Capture the session ID at the time of sending

			const messageData = {
				action: "sendMessage",
				sessionId: currentSessionId,
				route: config.webhook.route,
				chatInput: message,
				message: {
					payload: message,
				}

			};

			formData.append('json', new Blob([JSON.stringify(messageData)], { type: 'application/json' }));
			formData.append('sessionId', currentSessionId);

			if (files.length > 0) {
				files.forEach(file => {
					formData.append('files', file);
				});
			}

			const userMessageDiv = document.createElement('div');
			userMessageDiv.className = 'chat-message user';

			// Create the message bubble container
			const messageBubble = document.createElement('div');
			messageBubble.className = 'message-bubble-user';

			// Handle files (audio, images, etc.)
			if (files.length > 0) {
				files.forEach(file => {
					const isImage = file.type.startsWith('image/');
					const isAudio = file.type.startsWith('audio/') || file.name.endsWith('.mp3');

					let fileUrl;
					try {
						fileUrl = URL.createObjectURL(file);

						if (isAudio) {
							// Create container div for audio
							const audioContainer = document.createElement('div');
							audioContainer.style.width = '100%';

							// Create audio element
							const audioElement = document.createElement('audio');
							audioElement.controls = true;
							audioElement.style.width = '100%';
							audioElement.style.background = 'rgb(255, 255, 255)';
							audioElement.style.borderRadius = '8px';

							// Create source element for audio
							const sourceElement = document.createElement('source');
							sourceElement.src = fileUrl;
							sourceElement.type = file.type || 'audio/mp3';
							audioElement.appendChild(sourceElement);

							// Fallback text for unsupported browsers
							audioElement.appendChild(document.createTextNode('Your browser does not support audio playback'));

							// Create file name div
							const fileNameDiv = document.createElement('div');
							fileNameDiv.style.fontSize = '12px';
							fileNameDiv.style.marginTop = '8px';
							fileNameDiv.textContent = file.name;

							// Append audio and file name to container
							audioContainer.appendChild(audioElement);
							audioContainer.appendChild(fileNameDiv);

							// Append container to message bubble
							messageBubble.appendChild(audioContainer);
						}else if (isImage) {
                                // Create image element
                                const imgElement = document.createElement('img');
                                imgElement.src = fileUrl;
                                imgElement.alt = file.name;
                                imgElement.style.maxWidth = '100%';
                                imgElement.style.borderRadius = '10px';

                                // Append image to message bubble
                                messageBubble.appendChild(imgElement);

                                // Enable preview on click
                                enableImagePreview(imgElement, fileUrl);

						} else {
							// Create file message container
							const fileMessageDiv = document.createElement('div');
							fileMessageDiv.className = 'file-message';

							// Create SVG icon
							const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
							svgElement.classList.add('file-icon');
							svgElement.setAttribute('viewBox', '0 0 24 24');
							const pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
							pathElement.setAttribute('d', 'M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z');
							svgElement.appendChild(pathElement);

							// Create file name span
							const fileNameSpan = document.createElement('span');
							fileNameSpan.textContent = file.name;

							// Append SVG and file name to file message container
							fileMessageDiv.appendChild(svgElement);
							fileMessageDiv.appendChild(fileNameSpan);

							// Append file message to message bubble
							messageBubble.appendChild(fileMessageDiv);
						}
					} catch (error) {
						console.error('Error generating file URL:', error);
						const errorDiv = document.createElement('div');
						errorDiv.textContent = `Error: Unable to display file ${file.name}`;
						messageBubble.appendChild(errorDiv);
					}
				});
			} else {
				// console.log('No files to process');
			}

			// Handle plain text message
			if (message) {
				const messageTextDiv = document.createElement('div');
				messageTextDiv.textContent = message; // Use textContent to preserve whitespace
				messageBubble.appendChild(messageTextDiv);
			}

			// If there's no content (no files and no message), return early
			if (!messageBubble.hasChildNodes()) {
				// console.log('No message content to display');
				return;
			}

			// Append the message bubble to the user message div
			userMessageDiv.appendChild(messageBubble);
			// Format the timestamp
			// Format the timestamp
            const timeWithDate = new Date().toLocaleString([], {
                day: 'numeric',      // e.g., "5"
                month: 'short',      // e.g., "Jun"
                year: 'numeric',     // e.g., "2025"
                hour: '2-digit',     // e.g., "04"
                minute: '2-digit',   // e.g., "17"
                hour12: true         // e.g., "pm"
            });



            // Create a wrapper div for aligning the timestamp
            const timestampWrapper = document.createElement('div');
            // timestampWrapper.style.position='absolute';
            timestampWrapper.style.textAlign = 'right';
            timestampWrapper.style.marginTop = '-15px'; // Slight spacing below the bubble

            // Create the timestamp div itself
            const timestampDiv = document.createElement('div');
            timestampDiv.style.marginBottom = '-35px';
            timestampDiv.style.marginTop = '30px';
            timestampDiv.style.fontSize = '10px';
            timestampDiv.style.color = '#666';
            timestampDiv.textContent = timeWithDate;

            // Append timestamp to wrapper
            timestampWrapper.appendChild(timestampDiv);

            // Append message bubble and timestamp to the message container
            userMessageDiv.appendChild(messageBubble);
             // Now timestamp is under the bubble, right aligned

            // Append the user message div to the main messages container
            messagesContainer.appendChild(timestampWrapper);
            messagesContainer.appendChild(userMessageDiv);
			messagesContainer.scrollTop = messagesContainer.scrollHeight;

			// Clear input + preview
			filePreviewContainer.innerHTML = '';
			fileInput.value = '';
			currentFiles = [];
			updateButtonVisibility();

			const loadingDiv = document.createElement('div');
			loadingDiv.className = 'loading-indicator';
			loadingDiv.innerHTML = `
				<div class="dot"></div>
				<div class="dot"></div>
				<div class="dot"></div>
			`;

			messagesContainer.appendChild(loadingDiv);
			messagesContainer.scrollTop = messagesContainer.scrollHeight;
			// console.log('Sending message data:', JSON.stringify(messageData));


        try {

            // ✅ Connect WebSocket and send messageData + optional files
            // Global variable to track last activity
            let lastActivityTime = Date.now();
            let smartPingInterval = null;

            // Function to update last activity time
            function updateLastActivity() {
                lastActivityTime = Date.now();
            }

            // Function to send smart ping (only if no activity for 1 minute)
            function sendSmartPing() {
                const now = Date.now();
                const timeSinceLastActivity = now - lastActivityTime;
                const oneMinute = 60 * 1000; // 1 minute in milliseconds
                
                if (timeSinceLastActivity >= oneMinute && socket.readyState === WebSocket.OPEN) {
                    const pingMessage = { type: "ping" };
                    // console.log("📤 Sending smart ping after", Math.round(timeSinceLastActivity / 1000), "seconds of inactivity");
                    socket.send(JSON.stringify(pingMessage));
                    updateLastActivity(); // Update activity time after sending ping
                }
            }

            // Check if WebSocket URL is present
            async function connectWebSocket(messageData, retries = Infinity, delay = 5000) {
                // console.log("message ", messageData);

                if (config.wss && config.wss.url) {
                    // console.log('WebSocket inside URL:', socket);

                    // Create socket if not defined or closed
                    if (!socket || socket.readyState > 1) {
                        socket = new WebSocket(config.wss.url);
                        socket.binaryType = "arraybuffer"; // Support binary messages
                        // console.log('New WebSocket created. State:', socket.readyState);
                    }

                    socket.onerror = (err) => {
                        console.error('WebSocket error:', err);
                    };

                    socket.onclose = (event) => {
                        console.warn('WebSocket closed:', event.code, event.reason);
                        
                        // Clear the smart ping interval when socket closes
                        if (smartPingInterval) {
                            clearInterval(smartPingInterval);
                            smartPingInterval = null;
                        }
                        
                        if (retries > 0) {
                            console.warn(`Retrying in ${delay / 1000}s...`);
                            setTimeout(() => connectWebSocket(messageData, retries - 1, delay), delay);
                        }
                    };

                    const sendFilesOverWebSocket = async () => {
                        if (files.length === 0) {
                            const serialized = JSON.stringify(messageData);
                            socket.send(serialized);
                            updateLastActivity(); // Update activity after sending
                            return;
                        }

                        for (const file of files) {
                            try {
                                // Read the file data first
                                const arrayBuffer = await file.arrayBuffer();
                                
                                // Create a combined message object
                                const combinedMessage = {
                                    metadata: {
                                        ...messageData,
                                        files: [{
                                            name: file.name,
                                            type: file.type,
                                            size: file.size,
                                            binarySize: arrayBuffer.byteLength
                                        }]
                                    },
                                    
                                    binaryData: Array.from(new Uint8Array(arrayBuffer)) // Convert to plain array
                                };

                                if (socket.readyState === WebSocket.OPEN) {
                                    // console.log("JSON.stringify(combinedMessage)",JSON.stringify(combinedMessage));
                                    // Send as a single JSON message that includes both metadata and binary data
                                    socket.send(JSON.stringify(combinedMessage));
                                    updateLastActivity(); // Update activity after sending
                                    // console.log(`Sent combined message for file: ${file.name}`);
                                }

                            } catch (error) {
                                // console.error('Error sending file:', file.name, error);
                            }
                        }
                    };

                    if (socket.readyState === WebSocket.OPEN) {
                        // console.log('WebSocket already open, sending message');
                        await sendFilesOverWebSocket();

                        messageData = {}; // Reset after sending

                        // Start smart ping interval if not already running
                        if (!smartPingInterval) {
                            smartPingInterval = setInterval(sendSmartPing, 30000); // Check every 30 seconds
                        }
                                    
                    } else {        
                        socket.onopen = async () => {
                            // console.log('✅ WebSocket connection established');
                            updateLastActivity(); // Update activity when connection opens

                            if (messageData && Object.keys(messageData).length > 0 && messageData.chatInput) {
                                await sendFilesOverWebSocket();
                                // console.log("📤 Sent messageData:", serialized);
                            }

                            messageData = {}; // Reset after sending

                            // Start smart ping interval
                            if (!smartPingInterval) {
                                smartPingInterval = setInterval(sendSmartPing, 30000); // Check every 30 seconds
                            }
                        };
                    }

                    socket.onmessage = (event) => {
                        try {
                            updateLastActivity(); // Update activity when receiving any message
                            
                            const receivedData = JSON.parse(event.data);
                            // console.log("recvied------",receivedData);
                            if (receivedData.error) {
                                // console.error('Server error:', receivedData.error);
                                if (receivedData.receivedMessage) {
                                    try {
                                        const innerMessage = JSON.parse(receivedData.receivedMessage);
                                        // console.log('Parsed inner message:', innerMessage);
                                        if (innerMessage.type === 'pong') {
                                            // console.log('📥 Pong received 1:', innerMessage);
                                        } else if (innerMessage.type === 'ping') {
                                            const pongMessage = { type: 'pong' };
                                            // console.log('📤 got ping so Sending pong:', pongMessage);
                                            socket.send(JSON.stringify(pongMessage));
                                            updateLastActivity(); // Update activity after sending pong
                                        }
                                    } catch (e) {
                                        // console.warn('⚠️ Failed to parse inner message:', receivedData.receivedMessage);
                                    }
                                }
                            } else if (receivedData.type && receivedData.type.includes('Send "PING"')) {
                                const pongMessage = { type: 'ping' };
                                // console.log('📤 got connection so Sending ping:', pongMessage);
                                socket.send(JSON.stringify(pongMessage));
                                updateLastActivity(); // Update activity after sending ping
                            } else if (receivedData.type && receivedData.type.includes('pong')) {
                                // console.log('📥 Pong received:', receivedData);
                            } else {
                                // console.log('📥 Received message:', receivedData);
                                updateLastActivity();
                                handleResponse(receivedData);
                            }
                        } catch (e) {
                            // console.warn('⚠️ Failed to parse JSON, raw message:', event.data);
                        }
                    }; 
                }else {
                        // Fallback to HTTP if WebSocket URL is not present
                        const response = await fetch(config.webhook.url, {
                            method: 'POST',
                            body: files.length > 0 ? formData : JSON.stringify(messageData),
                            headers: files.length === 0 ? {
                                'Content-Type': 'application/json'
                            } : undefined,
                            signal: abortController.signal
                        });

                        // console.log('WebSocket URL not present, using HTTP fallback');
                        const data = await response.json();
                        loadingDiv.remove();
                        handleResponse(data);
                    }
                }


            // ✅ Call the function
            connectWebSocket(messageData);


            // Function to handle response (shared for WebSocket and HTTP)
            function handleResponse(data) {
                if (messageSessionId !== currentSessionId) {
                    // console.log('Discarding response from outdated session:', messageSessionId);
                    loadingDiv.remove();
                    return;
                }
                if (data != null) {
                    // console.log('Received data:', data);
                    loadingDiv.remove();
                    const botMessageDiv = document.createElement('div');
                    botMessageDiv.className = 'chat-message bot';

                    // console.log('Received data-----------------------------------:', data);
                    const rawMessage = Array.isArray(data) ? data[0].output : data.output;

                    
                    const customEvent = Array.isArray(data) ? data[0].event : data.event;
                    if (customEvent && customEvent.type) {
                        window.handleCustomEvent(customEvent.type, customEvent);
                    }

                    const extra = Array.isArray(data) ? data[0].extra : data.extra;
                    if (extra && extra.type) {
                        // window.handleCustomEvent(extra.type, extra);
                    }
					const table_content = extra && extra[0].content; // // Your actual table data object
                    const dropdown_content = extra[1] //&& extra.options;
                    // console.log('----------Table content---------------:', table_content);
                    // console.log('----------dropdown_content---------------', dropdown_content);





                    const timeWithDate = new Date().toLocaleString([], {
                        year: 'numeric',
                        month: 'short',     // e.g., "Jun"
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                    });


                    let messageBodyHTML = '';
                    let fulltableHTML = '';
                    if (table_content && Array.isArray(table_content.columns) && Array.isArray(table_content.rows)) {
                        // console.log('Table data is valid, setting up table and download buttons');
                        messageBodyHTML = `

                            <div class="message-bubble-table" id="message-body">
                                <!-- Table will be appended here -->
                            </div>
                            <div id="employee-table"></div>
                        `;
                        fulltableHTML = `
                                    <button id="view-table-btn" title="View Full Table">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                                            <path d="M3 3h6v2H5v4H3V3zm18 0v6h-2V5h-4V3h6zM3 21v-6h2v4h4v2H3zm18-6v6h-6v-2h4v-4h2z"/>
                                        </svg>
                                    </button>
                                    <button id="download-csv-btn" title="Download as CSV">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                                            <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
                                        </svg>
                                    </button>
                        `;

                    } else {
                        // console.warn('Table content is invalid or missing:', table_content);
                    }

                    if (dropdown_content && Array.isArray(dropdown_content.options) && dropdown_content.options.length > 0) {
                        // console.log('Dropdown data is valid, setting up dropdown');
                        messageBodyHTML += `
                            <div class="message-bubble-dropdown" id="dropdown-body">
                                <!-- Dropdown will be appended here -->
                            </div>
                            <div id="dropdown-container"></div>`;
                    }

                    let footerHTML = `
                        <div class="message-footer" style="position: absolute; order: 2;">
                                <button class="action-btn copy-btn" title="Copy">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M16 1H4a2 2 0 0 0-2 2v14h2V3h12V1zm3 4H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm0 16H8V7h11v14z" fill="currentColor"/>
                                    </svg>
                                </button>
                                <button class="action-btn like-btn" title="Like">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-md-heavy">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12.1318 2.50389C12.3321 2.15338 12.7235 1.95768 13.124 2.00775L13.5778 2.06447C16.0449 2.37286 17.636 4.83353 16.9048 7.20993L16.354 8.99999H17.0722C19.7097 8.99999 21.6253 11.5079 20.9313 14.0525L19.5677 19.0525C19.0931 20.7927 17.5124 22 15.7086 22H6C4.34315 22 3 20.6568 3 19V12C3 10.3431 4.34315 8.99999 6 8.99999H8C8.25952 8.99999 8.49914 8.86094 8.6279 8.63561L12.1318 2.50389ZM10 20H15.7086C16.6105 20 17.4008 19.3964 17.6381 18.5262L19.0018 13.5262C19.3488 12.2539 18.391 11 17.0722 11H15C14.6827 11 14.3841 10.8494 14.1956 10.5941C14.0071 10.3388 13.9509 10.0092 14.0442 9.70591L14.9932 6.62175C15.3384 5.49984 14.6484 4.34036 13.5319 4.08468L10.3644 9.62789C10.0522 10.1742 9.56691 10.5859 9 10.8098V19C9 19.5523 9.44772 20 10 20ZM7 11V19C7 19.3506 7.06015 19.6872 7.17071 20H6C5.44772 20 5 19.5523 5 19V12C5 11.4477 5.44772 11 6 11H7Z" fill="currentColor"/>
                                    </svg>
                                </button>
                                <button class="action-btn dislike-btn" title="Dislike">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-md-heavy">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.8727 21.4961C11.6725 21.8466 11.2811 22.0423 10.8805 21.9922L10.4267 21.9355C7.95958 21.6271 6.36855 19.1665 7.09975 16.7901L7.65054 15H6.93226C4.29476 15 2.37923 12.4921 3.0732 9.94753L4.43684 4.94753C4.91145 3.20728 6.49209 2 8.29589 2H18.0045C19.6614 2 21.0045 3.34315 21.0045 5V12C21.0045 13.6569 19.6614 15 18.0045 15H16.0045C15.745 15 15.5054 15.1391 15.3766 15.3644L11.8727 21.4961ZM14.0045 4H8.29589C7.39399 4 6.60367 4.60364 6.36637 5.47376L5.00273 10.4738C4.65574 11.746 5.61351 13 6.93226 13H9.00451C9.32185 13 9.62036 13.1506 9.8089 13.4059C9.99743 13.6612 10.0536 13.9908 9.96028 14.2941L9.01131 17.3782C8.6661 18.5002 9.35608 19.6596 10.4726 19.9153L13.6401 14.3721C13.9523 13.8258 14.4376 13.4141 15.0045 13.1902V5C15.0045 4.44772 14.5568 4 14.0045 4ZM17.0045 13V5C17.0045 4.64937 16.9444 4.31278 16.8338 4H18.0045C18.5568 4 19.0045 4.44772 19.0045 5V12C19.0045 12.5523 18.5568 13 18.0045 13H17.0045Z" fill="currentColor"/>
                                    </svg>
                                </button>
                                <button class="action-btn speak-btn" title="Read aloud">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-md-heavy">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M11 4.9099C11 4.47485 10.4828 4.24734 10.1621 4.54132L6.67572 7.7372C6.49129 7.90626 6.25019 8.00005 6 8.00005H4C3.44772 8.00005 3 8.44776 3 9.00005V15C3 15.5523 3.44772 16 4 16H6C6.25019 16 6.49129 16.0938 6.67572 16.2629L10.1621 19.4588C10.4828 19.7527 11 19.5252 11 19.0902V4.9099ZM8.81069 3.06701C10.4142 1.59714 13 2.73463 13 4.9099V19.0902C13 21.2655 10.4142 22.403 8.81069 20.9331L5.61102 18H4C2.34315 18 1 16.6569 1 15V9.00005C1 7.34319 2.34315 6.00005 4 6.00005H5.61102L8.81069 3.06701ZM20.3166 6.35665C20.8019 6.09313 21.409 6.27296 21.6725 6.75833C22.5191 8.3176 22.9996 10.1042 22.9996 12.0001C22.9996 13.8507 22.5418 15.5974 21.7323 17.1302C21.4744 17.6185 20.8695 17.8054 20.3811 17.5475C19.8927 17.2896 19.7059 16.6846 19.9638 16.1962C20.6249 14.9444 20.9996 13.5175 20.9996 12.0001C20.9996 10.4458 20.6064 8.98627 19.9149 7.71262C19.6514 7.22726 19.8312 6.62017 20.3166 6.35665ZM15.7994 7.90049C16.241 7.5688 16.8679 7.65789 17.1995 8.09947C18.0156 9.18593 18.4996 10.5379 18.4996 12.0001C18.4996 13.3127 18.1094 14.5372 17.4385 15.5604C17.1357 16.0222 16.5158 16.1511 16.0539 15.8483C15.5921 15.5455 15.4632 14.9255 15.766 14.4637C16.2298 13.7564 16.4996 12.9113 16.4996 12.0001C16.4996 10.9859 16.1653 10.0526 15.6004 9.30063C15.2687 8.85905 15.3578 8.23218 15.7994 7.90049Z" fill="currentColor"/>
                                    </svg>
                                </button>
                                ${fulltableHTML}
                            </div>`;


                    botMessageDiv.innerHTML = `
                        <div class="bot-message-container">
                         
                            <div class="message-bubble">
                                <div class="avatar bot-avatar"></div>                     
                                <div class="message-content">${formatBotMessage(rawMessage)}</div>
                                <div class="message-content1" style="position: absolute; top: -20px; right: 10px; font-size: 10px; color: #666; order: 1;"                             >
                                    ${timeWithDate}
                                </div>
                            </div>
                            ${messageBodyHTML}
                            ${footerHTML}
                    </div>`;


                    // Add event listeners for table and download buttons
                    if (table_content && Array.isArray(table_content.columns) && Array.isArray(table_content.rows)) {
                        // console.log('Appending table to message-body');
                        const messageBody = botMessageDiv.querySelector("#message-body");
                        if (messageBody) {
                            const table = createTableFromJSON(table_content);
                            messageBody.appendChild(table);
                            // console.log('Table appended to message-body:', table);

                            // Attach listener to view button
                            const viewTableBtn = botMessageDiv.querySelector('#view-table-btn');
                            if (viewTableBtn) {
                                viewTableBtn.addEventListener('click', () => {
                                    // console.log('View table button clicked, showing popup');
                                    showTablePopup(table_content);
                                });
                            } else {
                                console.error('view-table-btn not found');
                            }

                            // ✅ Attach listener to message-body div
                            messageBody.addEventListener('click', () => {
                                // console.log('Message body clicked, showing popup');
                                showTablePopup(table_content);
                            });

                            const downloadCsvBtn = botMessageDiv.querySelector('#download-csv-btn');
                            if (downloadCsvBtn) {
                                downloadCsvBtn.addEventListener('click', () => {
                                    // console.log('Download CSV button clicked');
                                    downloadTableAsCSV(table_content);
                                });
                            } else {
                                // console.error('download-csv-btn not found');
                            }
                        } else {
                            // console.error('message-body element not found');
                        }
                    } else {
                        // console.warn('Table content is invalid or missing:', table_content);
                    }



                    // Handle dropdown content
                    // Handle dropdown content
                    if (dropdown_content && Array.isArray(dropdown_content.options) && dropdown_content.options.length > 0) {
                        // console.log('Dropdown options:', dropdown_content.options);
                        // console.log('Appending dropdown to dropdown-body');
                        const dropdownBody = botMessageDiv.querySelector("#dropdown-body");
                        if (dropdownBody) {
                            const dropdown = createDropdownFromJSON(dropdown_content);
                            dropdownBody.appendChild(dropdown);
                            // console.log('Dropdown appended to dropdown-body:', dropdown);

                            // Add event listener to send selected option as a user message, only if a <select> element exists
                            const select = dropdown.querySelector('select');
                            if (select) {
                                select.addEventListener('change', (e) => {
                                    const selectedValue = e.target.value;
                                    if (selectedValue) {
                                        // console.log('Dropdown selection:', selectedValue);
                                        sendMessage(selectedValue, [], 'dropdown');
                                    }
                                });
                            } else {
                                // console.log('No <select> element found; likely using buttons instead of a dropdown');
                            }
                        } else {
                            // console.error('dropdown-body element not found');
                        }
                    } else {
                        // console.warn('Dropdown content is invalid or missing:', dropdown_content);
                    }
            
                    // Only get the message text (without icons)
                    const messageText = botMessageDiv.querySelector('.message-content').innerText;

                    if (globalAvatar) {
                        globalAvatar.speak(messageText);
                    }



                    botMessageDiv.querySelector('.copy-btn').onclick = () => {
                        navigator.clipboard.writeText(messageText);
                    };

                    // Like button
                    botMessageDiv.querySelector('.like-btn').onclick = () => {
                        fetch('http://localhost:5000/api/save-feedback', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                sessionId: currentSessionId,
                                message: messageText,
                                feedback: 'like'
                            })
                        }).then(res => res.json())
                        .then(data => console.log('Feedback saved:', data))
                        .catch(err => console.error('Error saving feedback:', err));
                    };

                    // Dislike button
                    botMessageDiv.querySelector('.dislike-btn').onclick = () => {
                        fetch('http://localhost:5000/api/save-feedback', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                sessionId: currentSessionId,
                                message: messageText,
                                feedback: 'dislike'
                            })
                        }).then(res => res.json())
                        .then(data => console.log('Feedback saved:', data))
                        .catch(err => console.error('Error saving feedback:', err));
                    };

                    // Speak button
                    const speakBtn = botMessageDiv.querySelector('.speak-btn');
                    let isSpeaking = false;

                    speakBtn.onclick = () => {

                        
                        if (!isSpeaking) {
                            const utterance = new SpeechSynthesisUtterance(messageText);
                            
                            // Get available voices and find Heera or similar female Indian English voice
                            const voices = speechSynthesis.getVoices();
                            const heeraVoice = voices.find(voice => 
                                voice.name === 'Microsoft Heera - English (India)' || 
                                voice.name.includes('Heera') && voice.lang === 'en-IN'
                            );
                            
                            // Set voice if found, otherwise use default
                            if (heeraVoice) {
                                utterance.voice = heeraVoice;
                            }
                            
                            speechSynthesis.cancel();
                            speechSynthesis.speak(utterance);

                            isSpeaking = true;
                            speakBtn.innerHTML = '⏹';

                            utterance.onend = utterance.onerror = () => {
                                isSpeaking = false;
                                speakBtn.innerHTML = `
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-md-heavy">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M11 4.9099C11 4.47485 10.4828 4.24734 10.1621 4.54132L6.67572 7.7372C6.49129 7.90626 6.25019 8.00005 6 8.00005H4C3.44772 8.00005 3 8.44776 3 9.00005V15C3 15.5523 3.44772 16 4 16H6C6.25019 16 6.49129 16.0938 6.67572 16.2629L10.1621 19.4588C10.4828 19.7527 11 19.5252 11 19.0902V4.9099ZM8.81069 3.06701C10.4142 1.59714 13 2.73463 13 4.9099V19.0902C13 21.2655 10.4142 22.403 8.81069 20.9331L5.61102 18H4C2.34315 18 1 16.6569 1 15V9.00005C1 7.34319 2.34315 6.00005 4 6.00005H5.61102L8.81069 3.06701ZM20.3166 6.35665C20.8019 6.09313 21.409 6.27296 21.6725 6.75833C22.5191 8.3176 22.9996 10.1042 22.9996 12.0001C22.9996 13.8507 22.5418 15.5974 21.7323 17.1302C21.4744 17.6185 20.8695 17.8054 20.3811 17.5475C19.8927 17.2896 19.7059 16.6846 19.9638 16.1962C20.6249 14.9444 20.9996 13.5175 20.9996 12.0001C20.9996 10.4458 20.6064 8.98627 19.9149 7.71262C19.6514 7.22726 19.8312 6.62017 20.3166 6.35665ZM15.7994 7.90049C16.241 7.5688 16.8679 7.65789 17.1995 8.09947C18.0156 9.18593 18.4996 10.5379 18.4996 12.0001C18.4996 13.3127 18.1094 14.5372 17.4385 15.5604C17.1357 16.0222 16.5158 16.1511 16.0539 15.8483C15.5921 15.5455 15.4632 14.9255 15.766 14.4637C16.2298 13.7564 16.4996 12.9113 16.4996 12.0001C16.4996 10.9859 16.1653 10.0526 15.6004 9.30063C15.2687 8.85905 15.3578 8.23218 15.7994 7.90049Z" fill="currentColor"/>
                                    </svg>
                                `;
                            };
                        } else {
                            speechSynthesis.cancel();
                            isSpeaking = false;
                            speakBtn.innerHTML = `
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-md-heavy">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11 4.9099C11 4.47485 10.4828 4.24734 10.1621 4.54132L6.67572 7.7372C6.49129 7.90626 6.25019 8.00005 6 8.00005H4C3.44772 8.00005 3 8.44776 3 9.00005V15C3 15.5523 3.44772 16 4 16H6C6.25019 16 6.49129 16.0938 6.67572 16.2629L10.1621 19.4588C10.4828 19.7527 11 19.5252 11 19.0902V4.9099ZM8.81069 3.06701C10.4142 1.59714 13 2.73463 13 4.9099V19.0902C13 21.2655 10.4142 22.403 8.81069 20.9331L5.61102 18H4C2.34315 18 1 16.6569 1 15V9.00005C1 7.34319 2.34315 6.00005 4 6.00005H5.61102L8.81069 3.06701ZM20.3166 6.35665C20.8019 6.09313 21.409 6.27296 21.6725 6.75833C22.5191 8.3176 22.9996 10.1042 22.9996 12.0001C22.9996 13.8507 22.5418 15.5974 21.7323 17.1302C21.4744 17.6185 20.8695 17.8054 20.3811 17.5475C19.8927 17.2896 19.7059 16.6846 19.9638 16.1962C20.6249 14.9444 20.9996 13.5175 20.9996 12.0001C20.9996 10.4458 20.6064 8.98627 19.9149 7.71262C19.6514 7.22726 19.8312 6.62017 20.3166 6.35665ZM15.7994 7.90049C16.241 7.5688 16.8679 7.65789 17.1995 8.09947C18.0156 9.18593 18.4996 10.5379 18.4996 12.0001C18.4996 13.3127 18.1094 14.5372 17.4385 15.5604C17.1357 16.0222 16.5158 16.1511 16.0539 15.8483C15.5921 15.5455 15.4632 14.9255 15.766 14.4637C16.2298 13.7564 16.4996 12.9113 16.4996 12.0001C16.4996 10.9859 16.1653 10.0526 15.6004 9.30063C15.2687 8.85905 15.3578 8.23218 15.7994 7.90049Z" fill="currentColor"/>
                                </svg>
                            `;
                        }
                    };

                    messagesContainer.appendChild(botMessageDiv);
                    messagesContainer.scrollTop = messagesContainer.scrollHeight;

                    // Ensure voices are loaded before attempting to use them
                    window.speechSynthesis.onvoiceschanged = () => {
                        window.speechSynthesis.getVoices();
                    };

                    // Handle copy buttons for code blocks
                    messagesContainer.querySelectorAll('.copy-code-btn').forEach(btn => {
                        btn.onclick = function () {
                            const codeElem = document.getElementById(this.getAttribute('data-target'));
                            if (codeElem) {
                                navigator.clipboard.writeText(codeElem.innerText)
                                    .then(() => {
                                        this.classList.add('copied');
                                        setTimeout(() => { this.classList.remove('copied'); }, 1200);
                                    });
                            }
                        };
                    });
                }
            }

            // Function to create and show the table popup
            function showTablePopup(tableData) {
                // console.log('Showing table popup with data:', tableData);
                const backdrop = document.createElement('div');
                backdrop.className = 'dialog-backdrop';
                chatContainer.appendChild(backdrop);

                const dialog = document.createElement('div');
                dialog.className = 'table-dialog';
                dialog.innerHTML = `
                    <div class="dialog-header">
                        <h3>${tableData.title || 'Table Data'}</h3>
                        <button class="dialog-close-button">×</button>
                    </div>
                    <div class="table-container"></div>
                `;
                
                backdrop.appendChild(dialog);

                const tableContainer = dialog.querySelector('.table-container');
                const table = createTableFromJSON(tableData, true); // Pass isPopup: true
                tableContainer.appendChild(table);
                // console.log('Table appended to popup:', table);

                const closeDialog = () => {
                    dialog.remove();
                    backdrop.remove();
                };

                dialog.querySelector('.dialog-close-button').addEventListener('click', closeDialog);
                backdrop.addEventListener('click', (e) => {
                    if (e.target === backdrop) {
                        closeDialog();
                    }
                });

                // Add escape key handler
                const handleEscape = (e) => {
                    if (e.key === 'Escape') {
                        closeDialog();
                        document.removeEventListener('keydown', handleEscape);
                    }
                };
                document.addEventListener('keydown', handleEscape);
            }

            function createTableFromJSON(data, isPopup = false) {
                const tableContainer = document.createElement("div");
                tableContainer.className = "table-container";
                if (!isPopup) tableContainer.style.cursor = "pointer";

                const table = document.createElement("table");
                table.border = "1";
                if (!isPopup) {
                    table.style.width = "100%";
                    table.style.boxSizing = "border-box";
                    table.style.borderCollapse = "collapse";
                    table.style.marginLeft = "40px";
                }

                // === Column truncation ===
                let columnsToRender;
                if (isPopup || data.columns.length <= 6) {
                    columnsToRender = data.columns;
                } else {
                    const firstCols = data.columns.slice(0, 2);
                    const lastCols = data.columns.slice(-2);
                    columnsToRender = [...firstCols, '...', ...lastCols];
                }

                // === Header ===
                const thead = document.createElement("thead");
                const headerRow = document.createElement("tr");
                columnsToRender.forEach(col => {
                    const th = document.createElement("th");
                    th.innerText = col;
                    if (!isPopup) {
                        th.style.padding = "8px";
                        th.style.backgroundColor = "#f0f0f0";
                        th.style.fontSize = "14px";
                        th.style.whiteSpace = "normal";
                        th.style.wordBreak = "break-word";
                    }
                    headerRow.appendChild(th);
                });
                thead.appendChild(headerRow);
                table.appendChild(thead);

                // === Row truncation ===
                let rowsToRender;
                if (isPopup || data.rows.length <= 3) {
                    rowsToRender = data.rows;
                } else {
                    const firstRows = data.rows.slice(0, 2);
                    const lastRow = data.rows[data.rows.length - 1];
                    rowsToRender = [...firstRows, '...', lastRow];
                }

                // === Body ===
                const tbody = document.createElement("tbody");

                rowsToRender.forEach(row => {
                    const tr = document.createElement("tr");

                    if (row === '...') {
                        // Create placeholder row with individual boxed cells
                        columnsToRender.forEach(col => {
                            const td = document.createElement("td");
                            td.innerText = '...';
                            td.className = 'ellipsis';
                            if (!isPopup) {
                                td.style.textAlign = 'center';
                                td.style.color = '#888';
                                td.style.fontStyle = 'italic';
                                td.style.padding = "8px";
                                td.style.fontSize = "14px";
                            }
                            tr.appendChild(td);
                        });
                    } else {
                        columnsToRender.forEach(col => {
                            const td = document.createElement("td");

                            if (col === '...') {
                                td.innerText = '...';
                                td.className = 'ellipsis';
                                if (!isPopup) {
                                    td.style.textAlign = 'center';
                                    td.style.color = '#888';
                                    td.style.fontStyle = 'italic';
                                    td.style.padding = "8px";
                                    td.style.fontSize = "14px";
                                    td.style.whiteSpace = "normal";
                                    td.style.wordBreak = "break-word";
                                }
                            } else {
                                td.innerText = row[col] || '';
                                if (!isPopup) {
                                    td.style.padding = "8px";
                                    td.style.fontSize = "14px";
                                    td.style.whiteSpace = "normal";
                                    td.style.wordBreak = "break-word";
                                }
                            }

                            tr.appendChild(td);
                        });
                    }

                    tbody.appendChild(tr);
                });

                table.appendChild(tbody);
                return table;
            }



            function createDropdownFromJSON(data) {
                // console.log('Creating dropdown or buttons from data:', data);

                const container = document.createElement('div');
                container.className = 'options-container';
                container.style.marginTop = '0px';
                
                // console.log('Option length:', data.options.length);

                // Add a label for both buttons and dropdown
                const label = document.createElement('label');
                // label.innerText = 'Make a choice from the list below';
                label.style.fontWeight = 'bold';
                label.style.position = 'center';
                label.style.display = 'block';
                label.style.marginBottom = '10px';
                label.style.marginTop = '10px';

                container.appendChild(label);


                // Check the number of options
                if (data.options.length < 6) {
                    // Display as buttons
                    // container.style.marginTop = '-px';
                    if (data.label){
                        const labelElement = document.createElement('div');
                        labelElement.textContent  = data.label// Create a header label element
                        labelElement.style.fontWeight = 'bold';
                        labelElement.style.margin = '5px 5px 5px 20px';
                        labelElement.style.fontSize = '14px';

                        // Insert the label before the container
                        container.prepend(labelElement);

                        // Reset any inline style if needed
                        container.style = '';
                    }

                    container.style.marginBottom = '-11px';
                    container.style.display = 'flex';
                    container.style.gap = '15px'; // Space between buttons
                    container.style.flexWrap = 'wrap'; // Allow buttons to wrap if needed
                    container.style.background = 'rgb(241, 241, 241)'; // Light background like in the image
                    container.style.padding = '5px 20px 8px 20px'; // Add padding for better appearance
                    container.style.borderRadius = '0px 0px 12px 12px';
                    
                    
                    
                    data.options.forEach(option => {
                        const button = document.createElement('button');
                        button.innerText = option;
                        button.style.padding = '8px 15px';
                        button.style.borderRadius = '20px'; // Rounded edges like in the image
                        button.style.border = '0px   #103278';
                        button.style.backgroundColor = '#fff';
                        button.style.color = '#000';
                        button.style.cursor = 'pointer';
                        button.style.fontSize = '14px';
                        button.style.fontWeight = '500';
                        button.style.transition = 'background-color 0.3s, transform 0.2s';
                        button.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.52)';

                        // Add hover effect
                        button.onmouseover = () => {
                            button.style.backgroundColor = 'rgb(9, 55, 148)';
                            button.style.color = '#fff';
                        };
                        button.onmouseout = () => {
                            button.style.backgroundColor = '#fff';
                            button.style.color = '#000';
                        };

                        // Add click event to send the selected option as a message
                        button.addEventListener('click', () => {
                            // console.log('Button clicked:', option);
                            sendMessage(option, [], 'button');
                        });

                        container.appendChild(button);
                    });
                } else {
                    // Display as dropdown
                    container.style.background = 'rgb(241, 241, 241)';

                    const select = document.createElement('select');
                    select.style.marginLeft = '35px';
                    // select.style.position = 'center';
                    select.style.marginRight = '-20px';
                    select.style.width = '80%';
                    select.style.padding = '8px';
                    select.style.borderRadius = '12px';
                    select.style.border = '0.5px solid #103278';
                    // select.style.fontSize = '14px';

                    // Add default option
                    const defaultOption = document.createElement('option');
                    defaultOption.value = '';
                    defaultOption.text = '--- select ---';
                    defaultOption.disabled = true;
                    defaultOption.selected = true;
                    select.appendChild(defaultOption);

                    // Add options from data
                    data.options.forEach(option => {
                        const opt = document.createElement('option');
                        opt.value = option;
                        opt.text = option;
                        select.appendChild(opt);
                    });

                    container.appendChild(select);
                }

                return container;
            }

            
            // Function to download table as CSV
            function downloadTableAsCSV(tableData) {
                // console.log('Generating CSV for table data:', tableData);
                
                // Escape CSV values to handle commas and quotes
                const escapeCsvValue = (value) => {
                    if (value === null || value === undefined) return '';
                    const str = String(value);
                    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
                        return `"${str.replace(/"/g, '""')}"`;
                    }
                    return str;
                };

                // Create CSV content
                const csvRows = [];
                // Add header row
                csvRows.push(tableData.columns.map(escapeCsvValue).join(','));
                // Add data rows
                tableData.rows.forEach(row => {
                    const rowData = tableData.columns.map(col => escapeCsvValue(row[col]));
                    csvRows.push(rowData.join(','));
                });
                const csvContent = csvRows.join('\n');

                // Create a downloadable file
                const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.setAttribute('href', url);
                link.setAttribute('download', `${tableData.title || 'table_data'}.csv`);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
                // console.log('CSV download initiated');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            loadingDiv.remove();

            if (messageSessionId === currentSessionId && error.name !== 'AbortError') {
                const errorMessageDiv = document.createElement('div');
                errorMessageDiv.className = 'chat-message bot';
                errorMessageDiv.innerHTML = `
                    <div class="avatar bot-avatar"></div>
                    <div class="message-bubble">
                        <div class="message-content">Sorry, there was an error processing your request. Please try again.</div>
                        
                    </div>`;
                messagesContainer.appendChild(errorMessageDiv);
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }
        }
    }

    

    
    // Initialize Speech Recognition (with fallback for different browsers)
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true; // Keep recognizing until stopped
        recognition.interimResults = true; // Show interim results while speaking
        recognition.lang = 'en-US'; // Set language to English (you can change this)

        const micButton = document.querySelector('.n8n-chat-widget .mic-button');
        const textarea = document.querySelector('.n8n-chat-widget .chat-input textarea');
        const messagesContainer = document.querySelector('.n8n-chat-widget .chat-messages');
        let isRecording = false; // Track if currently recording
        let mediaRecorder = null;
        let audioChunks = [];
        let stream = null;
        let finalTranscript = ''; // Store the final transcript to prevent clearing



        // Add input event listener to resize textarea on manual typing
        textarea.addEventListener('input', () => {
            autoResizeTextarea(textarea);
        });

        // Initial resize in case there's pre-filled content
        autoResizeTextarea(textarea);

        // Single event listener for the mic button
        micButton.addEventListener('click', async () => {
            if (!isRecording) {
                try {
                    // Request microphone access once
                    if (!stream) {
                        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                    }

                    // Set up MediaRecorder for audio recording
                    mediaRecorder = new MediaRecorder(stream);
                    audioChunks = [];

                    mediaRecorder.ondataavailable = (e) => {
                        if (e.data.size > 0) {
                            audioChunks.push(e.data);
                            // console.log('Audio chunk received, size:', e.data.size);
                        } else {
                            // console.log('Empty audio chunk received');
                        }
                    };

                    mediaRecorder.onstop = () => {
                        // console.log('MediaRecorder stopped');
                        isRecording = false;
                        micButton.innerHTML = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 225 225">
                        <path d="M0 0 C74.25 0 148.5 0 225 0 C225 74.25 225 148.5 225 225 C150.75 225 76.5 225 0 225 C0 150.75 0 76.5 0 0 Z " fill="#1A8CF5"/>
                        <path d="M0 0 C74.25 0 148.5 0 225 0 C225 74.25 225 148.5 225 225 C150.75 225 76.5 225 0 225 C0 150.75 0 76.5 0 0 Z M33.52099609 45.22900391 C29.06400389 50.41857396 25.46444198 56.11895674 22 62 C21.62472168 62.61681641 21.24944336 63.23363281 20.86279297 63.86914062 C8.53024002 84.46833269 6.14187949 112.96639212 11.54272461 136.10839844 C12.53793266 139.79982518 13.70155834 143.40494534 15 147 C15.59361328 148.68416016 15.59361328 148.68416016 16.19921875 150.40234375 C24.69539365 172.33433011 42.26561819 194.2061119 64 204 C64.56460938 204.31324219 65.12921875 204.62648437 65.7109375 204.94921875 C87.1798995 216.80871086 112.55255635 218.5723863 136 213 C137.17046875 212.73316406 138.3409375 212.46632812 139.546875 212.19140625 C164.2565814 205.90217102 186.56002795 189.1073612 200.25 167.6875 C210.53091588 150.22032776 215.45192313 132.75105937 215.4375 112.5625 C215.4375705 111.85412994 215.43764099 111.14575989 215.43771362 110.41592407 C215.39285102 98.67334417 214.36340714 87.98823158 210 77 C209.68885254 76.20851563 209.37770508 75.41703125 209.05712891 74.6015625 C204.3602331 63.04277767 198.33183926 53.26531944 190 44 C189.19820312 43.09894531 188.39640625 42.19789062 187.5703125 41.26953125 C168.72695623 21.3449988 141.53826676 9.57859137 114.20654297 8.71459961 C83.01212607 8.29590792 54.32788842 22.37027628 33.52099609 45.22900391 Z " fill="#FDFDFD" transform="translate(0,0)"/>
                        <path d="M0 0 C9.43911429 8.36648766 9.43911429 8.36648766 9.90390015 14.45280457 C9.91676056 15.22143326 9.92962097 15.99006195 9.94287109 16.78198242 C9.95893402 17.65686813 9.97499695 18.53175385 9.99154663 19.43315125 C10.03621625 23.43890455 10.07707677 27.44449492 10.10009766 31.45043945 C10.11662988 33.55797387 10.14388358 35.66545285 10.18212891 37.77270508 C10.23713828 40.82142031 10.25881029 43.8688228 10.2734375 46.91796875 C10.29610687 47.85158737 10.31877625 48.78520599 10.34213257 49.74711609 C10.3214097 56.22308454 8.86755592 60.40680985 4.75 65.4375 C0.6521656 69.33044268 -2.94933739 71.17704763 -8.5625 71.8125 C-14.49635577 71.20905704 -19.15779281 69.01561525 -23.125 64.5 C-27.28063419 58.51099779 -27.56859149 53.70975762 -27.5859375 46.60546875 C-27.5925943 45.6548909 -27.5992511 44.70431305 -27.60610962 43.72492981 C-27.61621679 41.71694874 -27.62092724 39.70893421 -27.62060547 37.70092773 C-27.62497035 34.64575122 -27.66128779 31.59202976 -27.69921875 28.53710938 C-27.70508915 26.58073407 -27.70905705 24.62435195 -27.7109375 22.66796875 C-27.72530853 21.76249802 -27.73967957 20.85702728 -27.75448608 19.92411804 C-27.70742842 13.31528905 -26.39869045 7.834048 -21.80258179 2.87614441 C-15.79732024 -2.44667155 -7.23520383 -3.47846338 0 0 Z " fill="#FAFCFD" transform="translate(121.25,56.5625)"/>
                        <path d="M0 0 C0.66 0 1.32 0 2 0 C1.7834375 0.97453125 1.566875 1.9490625 1.34375 2.953125 C-2.85656037 23.57396151 -3.19885228 45.06820928 4 65 C4.59361328 66.68416016 4.59361328 66.68416016 5.19921875 68.40234375 C13.56166262 89.98911747 30.58814616 111.35144858 52 121 C52.56460938 121.31324219 53.12921875 121.62648438 53.7109375 121.94921875 C75.1798995 133.80871086 100.55255635 135.5723863 124 130 C125.17046875 129.73316406 126.3409375 129.46632812 127.546875 129.19140625 C151.82183015 123.01282604 173.71715272 106.81179537 187.1875 85.75 C196.92100603 69.30774279 202.07008316 52.40402337 202.625 33.375 C202.68300781 31.72564453 202.68300781 31.72564453 202.7421875 30.04296875 C202.83543388 27.36213541 202.92123267 24.6812911 203 22 C203.33 22 203.66 22 204 22 C204.75131468 34.43161732 205.25646855 46.5899568 204 59 C203.34 59 202.68 59 202 59 C202.0309375 60.2065625 202.0309375 60.2065625 202.0625 61.4375 C202 64 202 64 201 65 C200.9175 66.0725 200.835 67.145 200.75 68.25 C199.85585927 72.72070366 198.32087939 74.01120855 195 77 C194.67 77.99 194.34 78.98 194 80 C193.34 80 192.68 80 192 80 C191.79890625 80.85271484 191.79890625 80.85271484 191.59375 81.72265625 C190.99791878 84.00798257 190.27331076 86.20649845 189.5 88.4375 C188.42789949 91.60673369 187.53416966 94.68814809 187 98 C186.01 97.67 185.02 97.34 184 97 C184.33 97.99 184.66 98.98 185 100 C184.01 100 183.02 100 182 100 C181.731875 100.763125 181.46375 101.52625 181.1875 102.3125 C179.66917942 105.74869921 178.03144034 107.3123731 174.9375 109.375 C172.78065401 110.87132414 172.78065401 110.87132414 172.3125 113.5 C171 116 171 116 168.9140625 116.8828125 C167.28617754 117.37066446 165.64615601 117.81998716 163.99609375 118.2265625 C163.33738281 118.48179687 162.67867187 118.73703125 162 119 C161.67 119.99 161.34 120.98 161 122 C158.39757586 123.64820195 157.13751221 124 154 124 C154 124.66 154 125.32 154 126 C152.700625 126.37125 152.700625 126.37125 151.375 126.75 C146.92540275 128.39799898 143.35658348 130.64341652 140 134 C138.989375 133.979375 137.97875 133.95875 136.9375 133.9375 C132.78794423 134.00336596 129.92483318 134.87344507 126.078125 136.2734375 C124 137 124 137 121.125 137.5625 C118.71228471 137.92060157 118.71228471 137.92060157 116 140 C113.3203125 140.25878906 113.3203125 140.25878906 110.125 140.265625 C108.97515625 140.26820313 107.8253125 140.27078125 106.640625 140.2734375 C105.43921875 140.26570312 104.2378125 140.25796875 103 140.25 C101.79859375 140.25773438 100.5971875 140.26546875 99.359375 140.2734375 C97.63460937 140.26957031 97.63460937 140.26957031 95.875 140.265625 C94.29332031 140.26224121 94.29332031 140.26224121 92.6796875 140.25878906 C90 140 90 140 87 138 C85.10507691 137.73404588 83.20819733 137.47648178 81.3046875 137.28125 C78.8520691 136.98194742 76.47931777 136.51197386 74.0625 136 C69.38567676 135.02838091 64.75334236 134.46000087 60 134 C59.67 132.02 59.34 130.04 59 128 C58.154375 128.061875 57.30875 128.12375 56.4375 128.1875 C51.64394383 127.9260333 48.27895302 126.13947651 44 124 C43.67 123.34 43.34 122.68 43 122 C40.97536745 121.34786708 40.97536745 121.34786708 39 121 C39 120.01 39 119.02 39 118 C36.03 117.505 36.03 117.505 33 117 C32.67 115.68 32.34 114.36 32 113 C30.68 112.67 29.36 112.34 28 112 C27.67 110.02 27.34 108.04 27 106 C26.01 106 25.02 106 24 106 C23.67 104.68 23.34 103.36 23 102 C22.34 102 21.68 102 21 102 C21 101.34 21 100.68 21 100 C20.01 100 19.02 100 18 100 C17.67 98.68 17.34 97.36 17 96 C15.68 95.67 14.36 95.34 13 95 C12.67 92.03 12.34 89.06 12 86 C10.68 85.67 9.36 85.34 8 85 C6.75 82.4375 6.75 82.4375 6 80 C5.34 80 4.68 80 4 80 C4 76.7 4 73.4 4 70 C2.515 70.495 2.515 70.495 1 71 C-1.77042109 68.22957891 -1.39796106 66.23466195 -1.625 62.375 C-1.69976562 61.18648437 -1.77453125 59.99796875 -1.8515625 58.7734375 C-1.90054687 57.85820312 -1.94953125 56.94296875 -2 56 C-2.66 56 -3.32 56 -4 56 C-4.05064156 49.21902652 -4.08570883 42.43810167 -4.10986328 35.65698242 C-4.11993107 33.3493467 -4.13358623 31.04172375 -4.15087891 28.73413086 C-4.17509287 25.42037809 -4.18647526 22.10679374 -4.1953125 18.79296875 C-4.20563507 17.7585112 -4.21595764 16.72405365 -4.22659302 15.6582489 C-4.22674408 14.6974794 -4.22689514 13.7367099 -4.22705078 12.74682617 C-4.231492 11.90077316 -4.23593323 11.05472015 -4.24050903 10.18302917 C-4 8 -4 8 -2 5 C-1.67 5 -1.34 5 -1 5 C-0.67 3.35 -0.34 1.7 0 0 Z " fill="#CACED3" transform="translate(12,82)"/>
                        <path d="M0 0 C3.3 0 6.6 0 10 0 C10.27972656 1.0621875 10.55945313 2.124375 10.84765625 3.21875 C13.45121026 12.6024157 15.80873797 20.21645098 24.53125 25.546875 C33.32990416 30.15322923 42.8912126 31.97979216 52.70703125 29.24609375 C54.90913936 28.28947098 56.93906262 27.22888192 59 26 C60.051875 25.4225 61.10375 24.845 62.1875 24.25 C69.0692032 18.74463744 72.4829887 12.30428587 73.625 3.625 C73.810625 1.830625 73.810625 1.830625 74 0 C77.63 0 81.26 0 85 0 C85.93801209 9.75532575 81.76242077 18.70152847 75.65234375 26.1953125 C68.00850509 34.54390224 60.29861934 39.38591152 49 41 C49 47.6 49 54.2 49 61 C44.71 61 40.42 61 36 61 C36 54.4 36 47.8 36 41 C33.69 40.67 31.38 40.34 29 40 C17.64646151 35.84988149 8.2245018 28.0226744 3 17 C0.76743274 11.26944275 -0.40060407 6.14259575 0 0 Z " fill="#F0F6F9" transform="translate(70,109)"/>
                        <path d="M0 0 C0.99 0 1.98 0 3 0 C5.1519437 3.22791555 5.20086443 4.28400809 5 8 C5.66 8.33 6.32 8.66 7 9 C6.67 21.87 6.34 34.74 6 48 C8.97 48 11.94 48 15 48 C14.73766655 56.26350363 12.29447636 61.66236307 6.4453125 67.5703125 C-1.50958713 74.45356762 -9.02456163 76.50124515 -19.3984375 76.3046875 C-29.19187782 75.4761752 -36.56546694 71.39770641 -43 64 C-47.06273937 57.68643549 -48.11999352 52.31960492 -48 45 C-47.34 45 -46.68 45 -46 45 C-45.566875 45.94875 -45.13375 46.8975 -44.6875 47.875 C-43.20697799 51.20041937 -43.20697799 51.20041937 -40 53 C-40 53.99 -40 54.98 -40 56 C-38.515 55.505 -38.515 55.505 -37 55 C-36.01 55.33 -35.02 55.66 -34 56 C-34.33 54.02 -34.66 52.04 -35 50 C-34.608125 50.53625 -34.21625 51.0725 -33.8125 51.625 C-33.214375 52.40875 -32.61625 53.1925 -32 54 C-31.2575 55.010625 -30.515 56.02125 -29.75 57.0625 C-26.17085869 61.29531682 -21.99983627 62.74547538 -16.5625 63.4375 C-10.82053837 62.73234682 -6.61494733 60.69994456 -2.625 56.5 C-0.15646679 52.70225661 1.25134514 50.07916154 1.24291992 45.49438477 C1.24599655 44.60989151 1.24907318 43.72539825 1.25224304 42.81410217 C1.24505753 41.86611252 1.23787201 40.91812286 1.23046875 39.94140625 C1.23001053 38.96010239 1.22955231 37.97879852 1.2290802 36.96775818 C1.2260616 34.89410187 1.21818702 32.82044775 1.20581055 30.74682617 C1.18758844 27.57788018 1.18530074 24.40922723 1.18554688 21.24023438 C1.18062998 19.22395581 1.17480091 17.20767923 1.16796875 15.19140625 C1.16685593 14.24544083 1.1657431 13.2994754 1.16459656 12.32484436 C1.13420122 8.0958628 1.08260843 4.1203915 0 0 Z " fill="#187AD3" transform="translate(129,64)"/>
                        <path d="M0 0 C0.33 0 0.66 0 1 0 C1.75131468 12.43161732 2.25646855 24.5899568 1 37 C0.34 37 -0.32 37 -1 37 C-0.979375 37.804375 -0.95875 38.60875 -0.9375 39.4375 C-1 42 -1 42 -2 43 C-2.0825 44.0725 -2.165 45.145 -2.25 46.25 C-3.14414073 50.72070366 -4.67912061 52.01120855 -8 55 C-8.33 55.99 -8.66 56.98 -9 58 C-9.66 58 -10.32 58 -11 58 C-11.1340625 58.56847656 -11.268125 59.13695312 -11.40625 59.72265625 C-12.00208122 62.00798257 -12.72668924 64.20649845 -13.5 66.4375 C-14.57210051 69.60673369 -15.46583034 72.68814809 -16 76 C-17.485 75.505 -17.485 75.505 -19 75 C-18.67 75.99 -18.34 76.98 -18 78 C-18.99 78 -19.98 78 -21 78 C-21.268125 78.763125 -21.53625 79.52625 -21.8125 80.3125 C-23.33082058 83.74869921 -24.96855966 85.3123731 -28.0625 87.375 C-30.21934599 88.87132414 -30.21934599 88.87132414 -30.6875 91.5 C-32 94 -32 94 -34.0859375 94.8828125 C-35.71382246 95.37066446 -37.35384399 95.81998716 -39.00390625 96.2265625 C-39.66261719 96.48179687 -40.32132812 96.73703125 -41 97 C-41.495 98.485 -41.495 98.485 -42 100 C-44.60242414 101.64820195 -45.86248779 102 -49 102 C-49 102.66 -49 103.32 -49 104 C-49.86625 104.2475 -50.7325 104.495 -51.625 104.75 C-56.07459725 106.39799898 -59.64341652 108.64341652 -63 112 C-64.010625 111.979375 -65.02125 111.95875 -66.0625 111.9375 C-70.21205577 112.00336596 -73.07516682 112.87344507 -76.921875 114.2734375 C-79 115 -79 115 -81.875 115.5625 C-84.28771529 115.92060157 -84.28771529 115.92060157 -87 118 C-89.6796875 118.25878906 -89.6796875 118.25878906 -92.875 118.265625 C-94.02484375 118.26820313 -95.1746875 118.27078125 -96.359375 118.2734375 C-97.56078125 118.26570313 -98.7621875 118.25796875 -100 118.25 C-101.20140625 118.25773437 -102.4028125 118.26546875 -103.640625 118.2734375 C-105.36539063 118.26957031 -105.36539063 118.26957031 -107.125 118.265625 C-108.70667969 118.26224121 -108.70667969 118.26224121 -110.3203125 118.25878906 C-113 118 -113 118 -116 116 C-118.0492094 115.54860541 -118.0492094 115.54860541 -120.1875 115.375 C-122.0746875 115.189375 -122.0746875 115.189375 -124 115 C-124 114.67 -124 114.34 -124 114 C-111.79 114 -99.58 114 -87 114 C-87 113.34 -87 112.68 -87 112 C-84.31275296 111.51937876 -81.62521967 111.04046504 -78.9375 110.5625 C-78.18533203 110.42779297 -77.43316406 110.29308594 -76.65820312 110.15429688 C-72.11474542 109.3478823 -67.57195693 108.62538056 -63 108 C-63 107.34 -63 106.68 -63 106 C-53.58997722 101.59225513 -53.58997722 101.59225513 -49 101 C-48.505 99.515 -48.505 99.515 -48 98 C-46.35 98 -44.7 98 -43 98 C-42.79632813 96.96617187 -42.59265625 95.93234375 -42.3828125 94.8671875 C-41.08000195 90.32902605 -38.40881106 88.08436142 -34.875 85.125 C-33.6887604 84.0772066 -32.50516297 83.02641436 -31.32421875 81.97265625 C-30.75106934 81.46492676 -30.17791992 80.95719727 -29.58740234 80.43408203 C-13.53309571 65.9303913 -2.53799356 42.52690708 -0.74609375 20.94140625 C-0.58488906 17.75269893 -0.46806634 14.56639988 -0.375 11.375 C-0.33632812 10.27542969 -0.29765625 9.17585938 -0.2578125 8.04296875 C-0.16456612 5.36213541 -0.07876733 2.6812911 0 0 Z " fill="#E0E0E0" transform="translate(215,104)"/>
                        <path d="M0 0 C0.66 0 1.32 0 2 0 C2.433125 0.94875 2.86625 1.8975 3.3125 2.875 C4.79302201 6.20041937 4.79302201 6.20041937 8 8 C8 8.99 8 9.98 8 11 C8.99 10.67 9.98 10.34 11 10 C11.99 10.33 12.98 10.66 14 11 C13.67 9.02 13.34 7.04 13 5 C14.73930069 7.1345963 15.9340523 8.78566998 16.75 11.4375 C18.34737486 14.71211846 20.37201208 15.84721724 23.44140625 17.69140625 C25.39896483 19.33497047 25.43739757 20.56699126 26 23 C28.49034386 24.29660434 28.49034386 24.29660434 31 25 C31 25.99 31 26.98 31 28 C31.99 28 32.98 28 34 28 C34 28.66 34 29.32 34 30 C26.35571825 31.50379313 20.92820253 30.63855241 14 27 C6.63570956 21.90683424 2.81819868 16.45459603 0 8 C-0.12781786 5.32605036 -0.04391871 2.67904143 0 0 Z " fill="#197EDB" transform="translate(81,109)"/>
                        <path d="M0 0 C1.125 3.75 1.125 3.75 0 6 C-1.66666667 6.33333333 -3.33333333 6.66666667 -5 7 C-5.33 7.66 -5.66 8.32 -6 9 C-7.75631823 9.94394954 -9.55590347 10.8085551 -11.375 11.625 C-12.35210937 12.07101563 -13.32921875 12.51703125 -14.3359375 12.9765625 C-17 14 -17 14 -20 14 C-20 14.66 -20 15.32 -20 16 C-27.99730769 18.54824033 -35.62504986 19.61387352 -44 20 C-44 20.66 -44 21.32 -44 22 C-59.59631728 24.59938621 -76.97668397 23.78698848 -92 19 C-92 18.34 -92 17.68 -92 17 C-93.98 16.67 -95.96 16.34 -98 16 C-98 15.34 -98 14.68 -98 14 C-99.19625 13.731875 -100.3925 13.46375 -101.625 13.1875 C-105.37855376 12.25912994 -108.60088806 10.86951157 -112 9 C-112 8.01 -112 7.02 -112 6 C-112.66 6 -113.32 6 -114 6 C-113.67 5.34 -113.34 4.68 -113 4 C-112.48953125 4.30292969 -111.9790625 4.60585937 -111.453125 4.91796875 C-87.81847838 18.53722434 -62.37475409 22.26807427 -36 16 C-34.82953125 15.73316406 -33.6590625 15.46632812 -32.453125 15.19140625 C-20.73634994 12.2091954 -9.92394982 6.86100234 0 0 Z " fill="#C9C7C5" transform="translate(172,196)"/>
                        <path d="M0 0 C0.33 0 0.66 0 1 0 C1 2.31 1 4.62 1 7 C-1.31 7.33 -3.62 7.66 -6 8 C-6.33 10.31 -6.66 12.62 -7 15 C-7.83144531 14.98839844 -8.66289062 14.97679687 -9.51953125 14.96484375 C-11.14955078 14.95130859 -11.14955078 14.95130859 -12.8125 14.9375 C-14.43091797 14.92009766 -14.43091797 14.92009766 -16.08203125 14.90234375 C-19.06512169 14.86375234 -19.06512169 14.86375234 -22 16 C-22.33 23.59 -22.66 31.18 -23 39 C-25.97 39 -28.94 39 -32 39 C-32.66 37.68 -33.32 36.36 -34 35 C-36.01508358 34.26676204 -36.01508358 34.26676204 -38 34 C-39 33 -39 33 -39.09765625 30.27734375 C-39.08605469 29.17519531 -39.07445313 28.07304687 -39.0625 26.9375 C-39.05347656 25.83277344 -39.04445313 24.72804687 -39.03515625 23.58984375 C-39.02355469 22.73519531 -39.01195313 21.88054687 -39 21 C-40.65 20.67 -42.3 20.34 -44 20 C-44 19.34 -44 18.68 -44 18 C-44.99 17.67 -45.98 17.34 -47 17 C-47.99897738 15.22762078 -48.99542972 13.45335056 -49.94921875 11.65625 C-51.28368601 9.5528518 -52.64621769 8.75657288 -55 8 C-54.67 7.34 -54.34 6.68 -54 6 C-53.35933594 6.33773437 -52.71867187 6.67546875 -52.05859375 7.0234375 C-51.19363281 7.46945313 -50.32867187 7.91546875 -49.4375 8.375 C-48.59058594 8.81585938 -47.74367188 9.25671875 -46.87109375 9.7109375 C-43.39744746 11.35287685 -43.39744746 11.35287685 -37 13 C-37 19.6 -37 26.2 -37 33 C-32.71 33 -28.42 33 -24 33 C-24 26.4 -24 19.8 -24 13 C-21.875625 12.319375 -19.75125 11.63875 -17.5625 10.9375 C-10.64579985 8.58762644 -5.20158403 5.20158403 0 0 Z " fill="#1078D5" transform="translate(143,137)"/>
                        <path d="M0 0 C0.77069824 0.12600586 1.54139648 0.25201172 2.33544922 0.38183594 C5.86463418 1.01461178 8.16721313 1.61147542 11.1875 3.625 C1.23681133 5.68670091 -7.7915201 5.57692877 -17.8125 4.625 C-17.8125 3.965 -17.8125 3.305 -17.8125 2.625 C-23.0925 2.625 -28.3725 2.625 -33.8125 2.625 C-33.8125 3.285 -33.8125 3.945 -33.8125 4.625 C-41.25480769 5.98942308 -41.25480769 5.98942308 -44.078125 4.14453125 C-44.65046875 3.64308594 -45.2228125 3.14164063 -45.8125 2.625 C-30.32380003 -1.47950549 -15.8357503 -2.60778894 0 0 Z " fill="#1C91FC" transform="translate(129.8125,10.375)"/>
                        <path d="M0 0 C1.299375 -0.03867188 1.299375 -0.03867188 2.625 -0.078125 C5 0.25 5 0.25 6.80078125 1.578125 C8.60424096 4.09239456 8.1884797 6.23432485 8 9.25 C8 10.24 8 11.23 8 12.25 C8 14.91666667 8 17.58333333 8 20.25 C7.34 20.25 6.68 20.25 6 20.25 C5.67 21.57 5.34 22.89 5 24.25 C4.1028125 24.2809375 4.1028125 24.2809375 3.1875 24.3125 C0.56685398 25.15456616 0.56685398 25.15456616 -0.75 28.8125 C-1.1625 29.946875 -1.575 31.08125 -2 32.25 C-3.65 32.25 -5.3 32.25 -7 32.25 C-6.60167969 31.54875 -6.20335937 30.8475 -5.79296875 30.125 C-1.19202893 21.88584743 2.15388585 14.72647847 3 5.25 C-0.63 5.25 -4.26 5.25 -8 5.25 C-8 3.93 -8 2.61 -8 1.25 C-5.09458095 0.28152698 -3.03362546 0.05417188 0 0 Z " fill="#167DDB" transform="translate(152,103.75)"/>
                        <path d="M0 0 C0.99 0 1.98 0 3 0 C5.1519437 3.22791555 5.20086443 4.28400809 5 8 C5.66 8.33 6.32 8.66 7 9 C6.88058377 13.65915291 6.7562764 18.31814204 6.62768555 22.97705078 C6.58471615 24.55774507 6.54301955 26.13847455 6.50268555 27.71923828 C6.12763714 42.36001679 6.12763714 42.36001679 5.65234375 48.9140625 C5.59941162 49.64834473 5.54647949 50.38262695 5.49194336 51.13916016 C4.87545592 53.47110421 3.72959707 54.37111901 2 56 C1.9845388 55.05825676 1.9845388 55.05825676 1.96876526 54.0974884 C1.86054055 47.55992556 1.74595561 41.02249609 1.62768555 34.48510742 C1.58438791 32.0456827 1.54270917 29.60622868 1.50268555 27.16674805 C1.44485792 23.65925266 1.38119915 20.15190403 1.31640625 16.64453125 C1.29969376 15.55477493 1.28298126 14.46501862 1.26576233 13.34223938 C1.24581711 12.32155869 1.22587189 11.30087799 1.20532227 10.24926758 C1.18977798 9.35436111 1.1742337 8.45945465 1.15821838 7.53742981 C0.9967245 4.94746909 0.56736995 2.5294851 0 0 Z " fill="#0E77D6" transform="translate(129,64)"/>
                        <path d="M0 0 C0.33 0 0.66 0 1 0 C1.33 16.83 1.66 33.66 2 51 C0.68 50.67 -0.64 50.34 -2 50 C-3.68348841 44.87633962 -4.2468852 40.57764115 -4.1875 35.125 C-4.18105469 33.80757812 -4.17460938 32.49015625 -4.16796875 31.1328125 C-4 28 -4 28 -3 27 C-2.84235595 25.22130274 -2.74899323 23.43681524 -2.68359375 21.65234375 C-2.64169922 20.57275391 -2.59980469 19.49316406 -2.55664062 18.38085938 C-2.51732422 17.24455078 -2.47800781 16.10824219 -2.4375 14.9375 C-2.39431641 13.79732422 -2.35113281 12.65714844 -2.30664062 11.48242188 C-2.20017161 8.65507805 -2.09815793 5.82764262 -2 3 C-1.34 3 -0.68 3 0 3 C0 2.01 0 1.02 0 0 Z " fill="#1686EA" transform="translate(93,69)"/>
                        <path d="M0 0 C0.33 0 0.66 0 1 0 C1.75131468 12.43161732 2.25646855 24.5899568 1 37 C0.34 37 -0.32 37 -1 37 C-0.979375 37.804375 -0.95875 38.60875 -0.9375 39.4375 C-1 42 -1 42 -2 43 C-2.12375 44.60875 -2.12375 44.60875 -2.25 46.25 C-3.14414073 50.72070366 -4.67912061 52.01120855 -8 55 C-8.33 55.99 -8.66 56.98 -9 58 C-9.66 58 -10.32 58 -11 58 C-11.103125 58.53625 -11.20625 59.0725 -11.3125 59.625 C-12.18092697 62.62502044 -13.55620296 65.2379535 -15 68 C-15.66 68 -16.32 68 -17 68 C-17.33 69.65 -17.66 71.3 -18 73 C-20.475 73.495 -20.475 73.495 -23 74 C-22.63648438 73.46632813 -22.27296875 72.93265625 -21.8984375 72.3828125 C-20.24627311 69.93422014 -18.61967978 67.47019655 -17 65 C-16.49726563 64.24203125 -15.99453125 63.4840625 -15.4765625 62.703125 C-3.14952686 43.26684658 -0.32782083 22.56311647 0 0 Z " fill="#DDDFE2" transform="translate(215,104)"/>
                        <path d="M0 0 C0.66 0.33 1.32 0.66 2 1 C3.14289156 6.47006588 3.12083769 11.86849475 3.0625 17.4375 C3.05798828 18.26443359 3.05347656 19.09136719 3.04882812 19.94335938 C3.03715811 21.96227146 3.01922718 23.98114574 3 26 C-0.63 26 -4.26 26 -8 26 C-7.01 25.34 -6.02 24.68 -5 24 C-4.61605333 21.22737745 -4.39657752 18.65676472 -4.3125 15.875 C-4.27833984 15.12089844 -4.24417969 14.36679688 -4.20898438 13.58984375 C-4.12645722 11.72708799 -4.06155289 9.86356674 -4 8 C-3.01 7.67 -2.02 7.34 -1 7 C-1.33 6.34 -1.66 5.68 -2 5 C-1.0625 2.375 -1.0625 2.375 0 0 Z " fill="#FBFDFC" transform="translate(115,144)"/>
                        <path d="M0 0 C0.33 0.66 0.66 1.32 1 2 C1.66 2.33 2.32 2.66 3 3 C2.67 5.64 2.34 8.28 2 11 C0.35 10.67 -1.3 10.34 -3 10 C-3.33 11.98 -3.66 13.96 -4 16 C-4.66 16 -5.32 16 -6 16 C-5.79375 16.928125 -5.5875 17.85625 -5.375 18.8125 C-5 22 -5 22 -7 25 C-7.99 25 -8.98 25 -10 25 C-10.33 25.99 -10.66 26.98 -11 28 C-11.66 28 -12.32 28 -13 28 C-12.67 29.32 -12.34 30.64 -12 32 C-13.485 32.495 -13.485 32.495 -15 33 C-14.52992869 26.88907303 -13.16734545 22.45615635 -10.3125 17.0625 C-9.95671875 16.37027344 -9.6009375 15.67804688 -9.234375 14.96484375 C-6.50321784 9.73746769 -3.49079967 4.76018137 0 0 Z " fill="#2B98F7" transform="translate(28,53)"/>
                        <path d="M0 0 C1.125 3.75 1.125 3.75 0 6 C-1.66666667 6.33333333 -3.33333333 6.66666667 -5 7 C-5.33 7.66 -5.66 8.32 -6 9 C-7.75631823 9.94394954 -9.55590347 10.8085551 -11.375 11.625 C-12.35210937 12.07101563 -13.32921875 12.51703125 -14.3359375 12.9765625 C-17 14 -17 14 -20 14 C-20 14.66 -20 15.32 -20 16 C-22.41559068 16.36354039 -24.83194297 16.71610551 -27.25 17.0625 C-27.93191406 17.16626953 -28.61382812 17.27003906 -29.31640625 17.37695312 C-32.7849925 17.86524925 -35.66911113 18.22762141 -39 17 C-37.9584375 16.731875 -36.916875 16.46375 -35.84375 16.1875 C-22.85481984 12.69253572 -11.09518697 7.65244078 0 0 Z " fill="#B7C2CC" transform="translate(172,196)"/>
                        <path d="M0 0 C2.97 0 5.94 0 9 0 C8.67 0.66 8.34 1.32 8 2 C8.99 1.67 9.98 1.34 11 1 C13.33299825 0.96045766 15.66708189 0.95598268 18 1 C18 1.33 18 1.66 18 2 C16.00127261 2.48444764 14.00094063 2.9622766 12 3.4375 C10.88625 3.70433594 9.7725 3.97117188 8.625 4.24609375 C-6.01972212 7.29181721 -20.57780206 6.89538465 -35 3 C-35 2.67 -35 2.34 -35 2 C-34.35313232 2.0714624 -33.70626465 2.1429248 -33.03979492 2.21655273 C-25.77552643 2.95582813 -18.6101067 3.12059485 -11.3125 3.0625 C-10.21744141 3.05798828 -9.12238281 3.05347656 -7.99414062 3.04882812 C-5.32936691 3.03719156 -2.66471483 3.02084564 0 3 C0 2.01 0 1.02 0 0 Z " fill="#2581D4" transform="translate(123,210)"/>
                        <path d="M0 0 C0.66 0 1.32 0 2 0 C1.67 2.64 1.34 5.28 1 8 C0.01 7.67 -0.98 7.34 -2 7 C-1.67 7.99 -1.34 8.98 -1 10 C-1.99 10 -2.98 10 -4 10 C-4.268125 10.763125 -4.53625 11.52625 -4.8125 12.3125 C-6.33082058 15.74869921 -7.96855966 17.3123731 -11.0625 19.375 C-13.22958858 20.87709384 -13.22958858 20.87709384 -13.6875 23.5625 C-15 26 -15 26 -17.12109375 26.765625 C-19.40950981 27.26543506 -21.67999422 27.68016381 -24 28 C-23.278125 27.46375 -22.55625 26.9275 -21.8125 26.375 C-18.16727452 23.2968096 -14.95722135 20.08336411 -12.9375 15.6875 C-12 14 -12 14 -9.875 13.25 C-8.946875 13.12625 -8.946875 13.12625 -8 13 C-7.773125 11.88625 -7.54625 10.7725 -7.3125 9.625 C-6.879375 8.42875 -6.44625 7.2325 -6 6 C-3.4375 4.8125 -3.4375 4.8125 -1 4 C-0.11306697 1.95894361 -0.11306697 1.95894361 0 0 Z " fill="#E8EBEC" transform="translate(198,172)"/>
                        <path d="M0 0 C0.77069824 0.12600586 1.54139648 0.25201172 2.33544922 0.38183594 C5.86463418 1.01461178 8.16721313 1.61147542 11.1875 3.625 C4.7525 4.12 4.7525 4.12 -1.8125 4.625 C-1.8125 3.965 -1.8125 3.305 -1.8125 2.625 C-3.765625 2.65755208 -5.71875 2.69010417 -7.671875 2.72265625 C-9.8125 2.625 -9.8125 2.625 -11.6484375 2.13867188 C-13.99475634 1.58173879 -16.1699821 1.41665144 -18.578125 1.30859375 C-19.46757813 1.26669922 -20.35703125 1.22480469 -21.2734375 1.18164062 C-22.19382812 1.14232422 -23.11421875 1.10300781 -24.0625 1.0625 C-24.99835938 1.01931641 -25.93421875 0.97613281 -26.8984375 0.93164062 C-29.20298641 0.8258195 -31.50763839 0.72373443 -33.8125 0.625 C-33.8125 0.295 -33.8125 -0.035 -33.8125 -0.375 C-22.51094936 -2.25859177 -11.25754563 -1.85386246 0 0 Z " fill="#4CA5F5" transform="translate(129.8125,10.375)"/>
                        <path d="M0 0 C0.33 0 0.66 0 1 0 C1 2.31 1 4.62 1 7 C-1.31 7.33 -3.62 7.66 -6 8 C-6.33 10.31 -6.66 12.62 -7 15 C-12.61 15 -18.22 15 -24 15 C-24 14.34 -24 13.68 -24 13 C-23.09378906 12.72027344 -22.18757813 12.44054687 -21.25390625 12.15234375 C-12.90536513 9.40483445 -6.33450826 6.33450826 0 0 Z " fill="#1B6FBD" transform="translate(143,137)"/>
                        <path d="M0 0 C1.2375 0.67095703 1.2375 0.67095703 2.5 1.35546875 C10.36918234 5.47449388 18.06959056 8.50408932 26.6015625 10.95703125 C30 12 30 12 34 14 C28.06 14.495 28.06 14.495 22 15 C22 14.34 22 13.68 22 13 C19.03 12.505 19.03 12.505 16 12 C16 11.34 16 10.68 16 10 C14.80375 9.731875 13.6075 9.46375 12.375 9.1875 C8.62144624 8.25912994 5.39911194 6.86951157 2 5 C2 4.01 2 3.02 2 2 C1.34 2 0.68 2 0 2 C0 1.34 0 0.68 0 0 Z " fill="#C4C7C9" transform="translate(58,200)"/>
                        <path d="M0 0 C1.299375 -0.03867188 1.299375 -0.03867188 2.625 -0.078125 C5 0.25 5 0.25 6.80078125 1.56640625 C8.58681517 4.07383498 8.19917578 6.26236324 8 9.25 C7.01 8.92 6.02 8.59 5 8.25 C4.67 9.9 4.34 11.55 4 13.25 C3.67 13.25 3.34 13.25 3 13.25 C3 10.61 3 7.97 3 5.25 C-0.63 5.25 -4.26 5.25 -8 5.25 C-8 3.93 -8 2.61 -8 1.25 C-5.09458095 0.28152698 -3.03362546 0.05417188 0 0 Z " fill="#117EE0" transform="translate(152,103.75)"/>
                        <path d="M0 0 C0 1.65 0 3.3 0 5 C-1.98 5.33 -3.96 5.66 -6 6 C-6.33 7.65 -6.66 9.3 -7 11 C-9.31 11.66 -11.62 12.32 -14 13 C-14.33 12.01 -14.66 11.02 -15 10 C-15.66 9.67 -16.32 9.34 -17 9 C-3.89320388 0 -3.89320388 0 0 0 Z " fill="#2894F9" transform="translate(70,19)"/>
                        <path d="M0 0 C0.66 0 1.32 0 2 0 C1.67515625 1.3921875 1.67515625 1.3921875 1.34375 2.8125 C-1.91482113 18.39865424 -1.28424911 34.16659553 -1 50 C-1.99 50.495 -1.99 50.495 -3 51 C-3.19224417 44.93139109 -3.37097055 38.86259269 -3.53710938 32.79321289 C-3.59555421 30.72799981 -3.65770985 28.6628883 -3.72363281 26.59790039 C-3.81767969 23.63186129 -3.89843105 20.66571442 -3.9765625 17.69921875 C-4.00875885 16.7741301 -4.0409552 15.84904144 -4.0741272 14.8959198 C-4.09429901 14.03525406 -4.11447083 13.17458832 -4.13525391 12.2878418 C-4.15746002 11.53061325 -4.17966614 10.7733847 -4.20254517 9.99320984 C-4 8 -4 8 -2 5 C-1.67 5 -1.34 5 -1 5 C-0.67 3.35 -0.34 1.7 0 0 Z " fill="#C6D8E9" transform="translate(12,82)"/>
                        <path d="M0 0 C4.17576168 0.68416434 7.88080407 2.01365009 11.8125 3.5625 C13.55466797 4.24505859 13.55466797 4.24505859 15.33203125 4.94140625 C16.21246094 5.29074219 17.09289062 5.64007813 18 6 C18 6.66 18 7.32 18 8 C20.97 8.495 20.97 8.495 24 9 C24 9.66 24 10.32 24 11 C25.98567708 11.1953125 27.97135417 11.390625 29.95703125 11.5859375 C32 12 32 12 35 14 C31.4280275 14.08118119 28.44112731 13.87312185 25 13 C23.41974995 12.78807905 21.83601539 12.60076629 20.25 12.4375 C19.45078125 12.35371094 18.6515625 12.26992187 17.828125 12.18359375 C17.22484375 12.12300781 16.6215625 12.06242188 16 12 C15.67 10.02 15.34 8.04 15 6 C13.7315625 6.0928125 13.7315625 6.0928125 12.4375 6.1875 C7.64394383 5.9260333 4.27895302 4.13947651 0 2 C0 1.34 0 0.68 0 0 Z " fill="#E5E7E8" transform="translate(56,204)"/>
                        <path d="M0 0 C0.33 0 0.66 0 1 0 C1 1.98 1 3.96 1 6 C0.34 6 -0.32 6 -1 6 C-0.67 13.92 -0.34 21.84 0 30 C0.33 30 0.66 30 1 30 C1.28571429 37.42857143 1.28571429 37.42857143 -1 41 C-1.12375 40.195625 -1.2475 39.39125 -1.375 38.5625 C-1.58125 37.716875 -1.7875 36.87125 -2 36 C-2.66 35.67 -3.32 35.34 -4 35 C-3.9285376 34.42459473 -3.8570752 33.84918945 -3.78344727 33.25634766 C-2.99262352 26.2763784 -2.88206335 19.39413308 -2.9375 12.375 C-2.94201172 11.27542969 -2.94652344 10.17585938 -2.95117188 9.04296875 C-2.96282861 6.36191997 -2.97918983 3.68099068 -3 1 C-2.34 1.66 -1.68 2.32 -1 3 C-0.67 2.01 -0.34 1.02 0 0 Z " fill="#0E8DFD" transform="translate(213,95)"/>
                        <path d="M0 0 C1.1484375 1.640625 1.1484375 1.640625 2 4 C1.1015625 6.796875 1.1015625 6.796875 -0.375 9.75 C-1.09816406 11.22726563 -1.09816406 11.22726563 -1.8359375 12.734375 C-2.41214844 13.85585937 -2.41214844 13.85585937 -3 15 C-3.66 15 -4.32 15 -5 15 C-5.1546875 15.804375 -5.1546875 15.804375 -5.3125 16.625 C-6.18092697 19.62502044 -7.55620296 22.2379535 -9 25 C-9.66 25 -10.32 25 -11 25 C-11.33 26.65 -11.66 28.3 -12 30 C-13.65 30.33 -15.3 30.66 -17 31 C-16.45472656 30.19949219 -16.45472656 30.19949219 -15.8984375 29.3828125 C-9.50506623 19.90750842 -4.14991426 10.68694733 0 0 Z " fill="#C7CED4" transform="translate(209,147)"/>
                        <path d="M0 0 C0.33 0 0.66 0 1 0 C1.33 10.56 1.66 21.12 2 32 C2.33 32 2.66 32 3 32 C3.07347656 32.92619141 3.07347656 32.92619141 3.1484375 33.87109375 C3.61163762 39.11803306 4.36586435 44.08824683 5.6953125 49.1875 C6 51 6 51 5 53 C2.22957891 50.22957891 2.60203894 48.23466195 2.375 44.375 C2.30023438 43.18648437 2.22546875 41.99796875 2.1484375 40.7734375 C2.09945313 39.85820312 2.05046875 38.94296875 2 38 C1.34 38 0.68 38 0 38 C0 25.46 0 12.92 0 0 Z " fill="#E9E7E7" transform="translate(8,100)"/>
                        <path d="M0 0 C1.4800841 0.11362262 2.95910074 0.24122908 4.4375 0.375 C5.26121094 0.44460937 6.08492187 0.51421875 6.93359375 0.5859375 C7.95646484 0.79089844 7.95646484 0.79089844 9 1 C9.33 1.66 9.66 2.32 10 3 C11.27875 3.103125 12.5575 3.20625 13.875 3.3125 C16.05859375 3.5234375 16.05859375 3.5234375 18 4 C19.9375 6.4375 19.9375 6.4375 21 9 C21.33 9.66 21.66 10.32 22 11 C13.8588535 10.18588535 6.56739663 5.69848323 0 1 C0 0.67 0 0.34 0 0 Z " fill="#198AED" transform="translate(54,197)"/>
                        <path d="M0 0 C2.14576637 -0.02685938 4.29162645 -0.04633088 6.4375 -0.0625 C7.63246094 -0.07410156 8.82742187 -0.08570313 10.05859375 -0.09765625 C13 0 13 0 14 1 C16.65656878 1.10183014 19.28101425 1.14072051 21.9375 1.125 C22.70570068 1.12306641 23.47390137 1.12113281 24.26538086 1.11914062 C29.89950682 1.07646234 35.40669462 0.710261 41 0 C38.81543676 2.64718048 37.64504168 3.88780413 34.20678711 4.48583984 C33.1575708 4.47762207 32.10835449 4.4694043 31.02734375 4.4609375 C29.88072266 4.45707031 28.73410156 4.45320312 27.55273438 4.44921875 C25.76319336 4.41248047 25.76319336 4.41248047 23.9375 4.375 C22.74060547 4.37371094 21.54371094 4.37242187 20.31054688 4.37109375 C11.42158036 4.28105357 11.42158036 4.28105357 8 2 C5.9507906 1.54860541 5.9507906 1.54860541 3.8125 1.375 C1.9253125 1.189375 1.9253125 1.189375 0 1 C0 0.67 0 0.34 0 0 Z " fill="#E8E8E8" transform="translate(91,218)"/>
                        <path d="M0 0 C0.66 0 1.32 0 2 0 C1.84660156 1.0621875 1.69320312 2.124375 1.53515625 3.21875 C0.81737857 8.96097142 0.6483373 14.72098415 0.4375 20.5 C0.39431641 21.60859375 0.35113281 22.7171875 0.30664062 23.859375 C0.20137786 26.57281506 0.09924154 29.28633417 0 32 C-0.99 32.495 -0.99 32.495 -2 33 C-2.33 24.42 -2.66 15.84 -3 7 C-2.34 6.67 -1.68 6.34 -1 6 C-0.34227572 2.97065509 -0.34227572 2.97065509 0 0 Z " fill="#258DEB" transform="translate(91,64)"/>
                        <path d="M0 0 C0.66 0.99 1.32 1.98 2 3 C7.14229954 4.33763866 12.5840277 4.31946588 17.875 4.5625 C18.75414063 4.60568359 19.63328125 4.64886719 20.5390625 4.69335938 C22.69255797 4.79869339 24.84626064 4.89977649 27 5 C27 5.33 27 5.66 27 6 C1.0298471 6.61916858 1.0298471 6.61916858 -10 3 C-6.98409514 -0.01590486 -4.13765554 -0.42437493 0 0 Z " fill="#0E8DFB" transform="translate(96,208)"/>
                        <path d="M0 0 C0.99 0 1.98 0 3 0 C5.12526037 3.18789056 5.23682404 3.84538171 5.13525391 7.47143555 C5.11508209 8.37214279 5.09491028 9.27285004 5.0741272 10.20085144 C5.02583267 11.65410576 5.02583267 11.65410576 4.9765625 13.13671875 C4.95153656 14.13129593 4.92651062 15.12587311 4.90072632 16.15058899 C4.81849847 19.32990458 4.7219191 22.5086016 4.625 25.6875 C4.56676333 27.84177154 4.50945999 29.99606852 4.453125 32.15039062 C4.31291565 37.43393686 4.16091863 42.71704615 4 48 C3.67 48 3.34 48 3 48 C2.98018066 46.75911621 2.96036133 45.51823242 2.93994141 44.23974609 C2.86367919 39.62138099 2.7749937 35.00332248 2.68261719 30.38525391 C2.64441252 28.38922188 2.60954498 26.39312301 2.578125 24.39697266 C2.53228936 21.52221846 2.47432559 18.64792108 2.4140625 15.7734375 C2.39673569 14.44184097 2.39673569 14.44184097 2.37905884 13.08334351 C2.26705038 8.34577734 1.81584956 4.45360998 0 0 Z " fill="#2279C6" transform="translate(129,64)"/>
                        <path d="M0 0 C2.0625 0.4375 2.0625 0.4375 4 1 C3.01 1.33 2.02 1.66 1 2 C0.67 9.59 0.34 17.18 0 25 C-2.97 25 -5.94 25 -9 25 C-9.66 23.68 -10.32 22.36 -11 21 C-8.03 21 -5.06 21 -2 21 C-1.93941406 19.56785156 -1.87882812 18.13570312 -1.81640625 16.66015625 C-1.73201896 14.79425959 -1.64737007 12.92837476 -1.5625 11.0625 C-1.52318359 10.11697266 -1.48386719 9.17144531 -1.44335938 8.19726562 C-1.40146484 7.29814453 -1.35957031 6.39902344 -1.31640625 5.47265625 C-1.27974854 4.64000244 -1.24309082 3.80734863 -1.20532227 2.94946289 C-1 1 -1 1 0 0 Z " fill="#0E75D6" transform="translate(120,151)"/>
                        <path d="M0 0 C0.99 0 1.98 0 3 0 C3.12375 0.556875 3.2475 1.11375 3.375 1.6875 C3.92476438 4.02515957 3.92476438 4.02515957 5.0625 6.125 C6.4524642 10.38755687 6.15539143 14.55407858 6 19 C5.34 19 4.68 19 4 19 C3.13499112 16.39898714 2.28273072 13.79493589 1.4375 11.1875 C1.19064453 10.44951172 0.94378906 9.71152344 0.68945312 8.95117188 C-1.11328125 3.33984375 -1.11328125 3.33984375 0 0 Z " fill="#EAEBED" transform="translate(209,72)"/>
                        <path d="M0 0 C2.0625 0.4375 2.0625 0.4375 4 1 C-0.58547704 6.40431223 -6.63500118 9.97262981 -13 13 C-13.66 12.67 -14.32 12.34 -15 12 C-14.67 11.01 -14.34 10.02 -14 9 C-12.02 9 -10.04 9 -8 9 C-7.67 8.01 -7.34 7.02 -7 6 C-6.34 5.67 -5.68 5.34 -5 5 C-3.86649466 2.98330173 -3.86649466 2.98330173 -3 1 C-2.34 1 -1.68 1 -1 1 C-0.67 0.67 -0.34 0.34 0 0 Z " fill="#177DD6" transform="translate(172,192)"/>
                        <path d="M0 0 C1.32 0 2.64 0 4 0 C5.11502133 1.11502133 6.21528603 2.24757894 7.25 3.4375 C9.58660302 5.52375269 12.17517717 6.68174935 15 8 C15 8.99 15 9.98 15 11 C15.99 11.33 16.98 11.66 18 12 C15.50907189 13.24546405 14.58919267 12.7767578 12 12 C12 11.01 12 10.02 12 9 C9.03 8.505 9.03 8.505 6 8 C5.67 6.68 5.34 5.36 5 4 C4.360625 3.896875 3.72125 3.79375 3.0625 3.6875 C2.381875 3.460625 1.70125 3.23375 1 3 C0.67 2.01 0.34 1.02 0 0 Z " fill="#E2E4E5" transform="translate(39,191)"/>
                        <path d="M0 0 C0.66 0 1.32 0 2 0 C2.32613281 0.66386719 2.65226562 1.32773438 2.98828125 2.01171875 C5.18009471 6.44060436 7.35262752 10.81993819 10 15 C7.69 14.67 5.38 14.34 3 14 C2.67 11.36 2.34 8.72 2 6 C1.01 6 0.02 6 -1 6 C-0.67 4.02 -0.34 2.04 0 0 Z " fill="#1D7FD7" transform="translate(70,121)"/>
                        <path d="M0 0 C1.65 0 3.3 0 5 0 C6.04761905 5.23809524 6.04761905 5.23809524 6 8 C4.1875 10.375 4.1875 10.375 2 12 C1.34 12.66 0.68 13.32 0 14 C0.185625 13.05125 0.37125 12.1025 0.5625 11.125 C1.28686632 8.10131207 1.28686632 8.10131207 0 6 C-0.039992 4.00039988 -0.04346799 1.99952758 0 0 Z " fill="#1380E0" transform="translate(136,112)"/>
                        <path d="M0 0 C0.99 0 1.98 0 3 0 C2.01 3.3 1.02 6.6 0 10 C-0.66 10 -1.32 10 -2 10 C-2 11.65 -2 13.3 -2 15 C-2.99 15.495 -2.99 15.495 -4 16 C-4.33 13.36 -4.66 10.72 -5 8 C-4.34 8 -3.68 8 -3 8 C-2.67 6.02 -2.34 4.04 -2 2 C-1.34 2 -0.68 2 0 2 C0 1.34 0 0.68 0 0 Z " fill="#F3F1F1" transform="translate(14,72)"/>
                        <path d="M0 0 C1 2 1 2 0.3125 4.5625 C-0.3371875 5.7690625 -0.3371875 5.7690625 -1 7 C-2.33076989 7.34342449 -3.66431979 7.67619874 -5 8 C-5.45375 8.78375 -5.9075 9.5675 -6.375 10.375 C-8.43739274 13.70655751 -10.40157813 14.57562468 -14 16 C-14.99 16 -15.98 16 -17 16 C-16.10796875 15.18015625 -15.2159375 14.3603125 -14.296875 13.515625 C-13.11454214 12.42712808 -11.93225277 11.33858392 -10.75 10.25 C-9.87021484 9.44175781 -9.87021484 9.44175781 -8.97265625 8.6171875 C-5.91843019 5.80318147 -2.90859255 2.96618844 0 0 Z " fill="#BCC7D1" transform="translate(191,179)"/>
                        <path d="M0 0 C0.33 0 0.66 0 1 0 C1.33 2.31 1.66 4.62 2 7 C1.01 7.33 0.02 7.66 -1 8 C-1.80212628 9.87387216 -1.80212628 9.87387216 -2.1875 12.0625 C-2.34605469 12.79597656 -2.50460938 13.52945313 -2.66796875 14.28515625 C-2.77753906 14.85105469 -2.88710937 15.41695312 -3 16 C-6.75 17.125 -6.75 17.125 -9 16 C-8.2575 15.030625 -7.515 14.06125 -6.75 13.0625 C-3.81725271 8.98506218 -1.88231629 4.63743847 0 0 Z " fill="#1B74C5" transform="translate(154,119)"/>
                        <path d="M0 0 C1.125 3.75 1.125 3.75 0 6 C-1.66666667 6.33333333 -3.33333333 6.66666667 -5 7 C-5.33 7.66 -5.66 8.32 -6 9 C-8.9375 10.6875 -8.9375 10.6875 -12 12 C-12.66 11.67 -13.32 11.34 -14 11 C-9.85989729 6.45924219 -5.17609824 3.28157862 0 0 Z " fill="#C1CAD0" transform="translate(172,196)"/>
                        <path d="M0 0 C-2.64 0 -5.28 0 -8 0 C-8 0.66 -8 1.32 -8 2 C-15.38461538 3.35384615 -15.38461538 3.35384615 -18.5 1.5625 C-18.995 1.046875 -19.49 0.53125 -20 0 C-6 -4 -6 -4 0 0 Z " fill="#3E9AF3" transform="translate(104,13)"/>
                        <path d="M0 0 C3.96 0 7.92 0 12 0 C12 0.99 12 1.98 12 3 C14.64 3 17.28 3 20 3 C20 3.33 20 3.66 20 4 C6.3667426 4.3690205 6.3667426 4.3690205 0 2 C0 1.34 0 0.68 0 0 Z " fill="#D1D2D4" transform="translate(84,214)"/>
                        <path d="M0 0 C3.71599191 -0.20086443 4.77208445 -0.1519437 8 2 C8 2.99 8 3.98 8 5 C8.99 5 9.98 5 11 5 C11 5.66 11 6.32 11 7 C6.545 7.495 6.545 7.495 2 8 C2.66 6.68 3.32 5.36 4 4 C3.01 3.67 2.02 3.34 1 3 C0.67 2.01 0.34 1.02 0 0 Z " fill="#1D88EB" transform="translate(104,132)"/>
                        <path d="M0 0 C4.95 0 9.9 0 15 0 C14.67 0.99 14.34 1.98 14 3 C12.23397681 3.41676948 10.46185699 3.8077738 8.6875 4.1875 C7.70136719 4.40792969 6.71523437 4.62835938 5.69921875 4.85546875 C3 5 3 5 1.14453125 3.67578125 C0 2 0 2 0 0 Z " fill="#1473C9" transform="translate(106,128)"/>
                        <path d="M0 0 C0.33 0 0.66 0 1 0 C1.22951631 3.45725945 1.4296071 6.9156576 1.625 10.375 C1.68945312 11.34050781 1.75390625 12.30601563 1.8203125 13.30078125 C2.17190847 19.84925615 1.61086075 25.64207398 0 32 C-0.66 32 -1.32 32 -2 32 C-1.84660156 30.9378125 -1.69320312 29.875625 -1.53515625 28.78125 C-0.81737857 23.03902858 -0.6483373 17.27901585 -0.4375 11.5 C-0.39431641 10.39140625 -0.35113281 9.2828125 -0.30664062 8.140625 C-0.20137786 5.42718494 -0.09924154 2.71366583 0 0 Z " fill="#B3C8DF" transform="translate(215,104)"/>
                        <path d="M0 0 C1.75 0.8125 1.75 0.8125 2.75 2.8125 C3.74 3.4725 4.73 4.1325 5.75 4.8125 C1.27745503 6.30334832 -2.77745503 6.30334832 -7.25 4.8125 C-7.25 4.1525 -7.25 3.4925 -7.25 2.8125 C-3.15 -0.2625 -3.15 -0.2625 0 0 Z M2.75 1.8125 C4.75 2.8125 4.75 2.8125 4.75 2.8125 Z " fill="#E5EFF4" transform="translate(113.25,122.1875)"/>
                        <path d="M0 0 C0.71285156 0.33773437 1.42570312 0.67546875 2.16015625 1.0234375 C7.38656437 3.45726954 12.39584643 5.6300958 18 7 C17.67 7.66 17.34 8.32 17 9 C13.94768215 9.2934921 11.04245039 9.43764884 8 9 C5.6875 6.625 5.6875 6.625 4 4 C1.88339573 2.68834743 1.88339573 2.68834743 0 2 C0 1.34 0 0.68 0 0 Z " fill="#1C69B0" transform="translate(88,143)"/>
                        <path d="M0 0 C1.66066101 3.06861273 2.70177275 6.07564723 3.625 9.4375 C3.88539062 10.36433594 4.14578125 11.29117188 4.4140625 12.24609375 C4.98381204 14.92391659 5.10889863 17.27258425 5 20 C4.01 19.67 3.02 19.34 2 19 C-0.51858302 13.08739067 -0.23666802 6.29799892 0 0 Z " fill="#C6D0D7" transform="translate(11,132)"/>
                        <path d="M0 0 C0.33 0 0.66 0 1 0 C1.12375 0.969375 1.2475 1.93875 1.375 2.9375 C1.58125 3.948125 1.7875 4.95875 2 6 C2.66 6.33 3.32 6.66 4 7 C3.360625 7.103125 2.72125 7.20625 2.0625 7.3125 C1.381875 7.539375 0.70125 7.76625 0 8 C-0.33 8.99 -0.66 9.98 -1 11 C-1.66 11 -2.32 11 -3 11 C-2.67 12.32 -2.34 13.64 -2 15 C-2.99 15.33 -3.98 15.66 -5 16 C-4.55643705 9.79011871 -3.08467498 5.39459439 0 0 Z " fill="#419EF3" transform="translate(18,70)"/>
                        <path d="M0 0 C1.9375 0.3125 1.9375 0.3125 4 1 C4.33 1.99 4.66 2.98 5 4 C5.66 4 6.32 4 7 4 C7 7.3 7 10.6 7 14 C4.89284903 11.19046537 3.33410537 8.94153036 1.8125 5.875 C1.29623047 4.85019531 1.29623047 4.85019531 0.76953125 3.8046875 C0 2 0 2 0 0 Z " fill="#EEEFF0" transform="translate(200,56)"/>
                        <path d="M0 0 C0.66 0 1.32 0 2 0 C2.66 4.29 3.32 8.58 4 13 C2.68 13.33 1.36 13.66 0 14 C0 9.38 0 4.76 0 0 Z " fill="#F1F7F6" transform="translate(8,138)"/>
                        <path d="M0 0 C7.38461538 -0.36923077 7.38461538 -0.36923077 10.5 1.5 C10.995 1.995 11.49 2.49 12 3 C8.77208445 5.1519437 7.71599191 5.20086443 4 5 C3.67 4.01 3.34 3.02 3 2 C2.01 2 1.02 2 0 2 C0 1.34 0 0.68 0 0 Z " fill="#F6F8F7" transform="translate(112,121)"/>
                        <path d="M0 0 C5.35048061 0.37328935 7.50912907 1.9957657 11 6 C10.01 6 9.02 6 8 6 C8 5.34 8 4.68 8 4 C5.69 4 3.38 4 1 4 C0.67 4.99 0.34 5.98 0 7 C-0.66 6.34 -1.32 5.68 -2 5 C-1.34 3.35 -0.68 1.7 0 0 Z " fill="#2894F7" transform="translate(162,24)"/>
                        <path d="M0 0 C0.66 0.33 1.32 0.66 2 1 C2.125 6.75 2.125 6.75 1 9 C1.66 9 2.32 9 3 9 C3 9.66 3 10.32 3 11 C-0.69790046 9.76736651 -0.9354846 8.79947549 -2.6875 5.4375 C-3.12449219 4.61121094 -3.56148437 3.78492188 -4.01171875 2.93359375 C-4.33785156 2.29550781 -4.66398437 1.65742188 -5 1 C-4.01 1.33 -3.02 1.66 -2 2 C-2 2.66 -2 3.32 -2 4 C-1.34 4 -0.68 4 0 4 C0 2.68 0 1.36 0 0 Z " fill="#1E87E4" transform="translate(29,164)"/>
                        <path d="M0 0 C2.67927341 4.01891012 2.15601248 6.24161923 2 11 C1.34 11 0.68 11 0 11 C0 7.37 0 3.74 0 0 Z M-8 7 C-7.01 7.33 -6.02 7.66 -5 8 C-5 8.66 -5 9.32 -5 10 C-3.68 10.66 -2.36 11.32 -1 12 C-2.98 12.99 -2.98 12.99 -5 14 C-8 9.25 -8 9.25 -8 7 Z " fill="#E0EEF8" transform="translate(81,117)"/>
                        <path d="M0 0 C0 0.33 0 0.66 0 1 C-7.97490128 2.32915021 -15.94186719 2.08801359 -24 2 C-24 1.67 -24 1.34 -24 1 C-15.72913843 -0.59105604 -8.35268278 -1.2386744 0 0 Z " fill="#D1D1D1" transform="translate(128,217)"/>
                        <path d="M0 0 C0.66 0.33 1.32 0.66 2 1 C0.5 3 0.5 3 -2 5 C-4.75871627 5.35800135 -7.20097524 5.18660165 -10 5 C-9.67 4.01 -9.34 3.02 -9 2 C-6.94921875 1.77213542 -4.8984375 1.54427083 -2.84765625 1.31640625 C-0.98859771 1.18113386 -0.98859771 1.18113386 0 0 Z " fill="#E8E9EB" transform="translate(154,211)"/>
                        <path d="M0 0 C0.91058531 3.07322544 1.08886184 5.80097361 1 9 C-0.65 9.66 -2.3 10.32 -4 11 C-4 7 -4 7 -3 4 C-2.34 4 -1.68 4 -1 4 C-0.67 2.68 -0.34 1.36 0 0 Z " fill="#E9E7E6" transform="translate(207,158)"/>
                        <path d="M0 0 C0.66 0 1.32 0 2 0 C1.67 2.64 1.34 5.28 1 8 C0.01 7.67 -0.98 7.34 -2 7 C-2 7.66 -2 8.32 -2 9 C-3.65 9.33 -5.3 9.66 -7 10 C-6.8125 8.125 -6.8125 8.125 -6 6 C-4.33333333 5.33333333 -2.66666667 4.66666667 -1 4 C-0.11306697 1.95894361 -0.11306697 1.95894361 0 0 Z " fill="#E1E2E3" transform="translate(198,172)"/>
                        <path d="M0 0 C0.99 0.33 1.98 0.66 3 1 C0.36 4.63 -2.28 8.26 -5 12 C-5.66 11.34 -6.32 10.68 -7 10 C-6.34 8.68 -5.68 7.36 -5 6 C-4.34 6 -3.68 6 -3 6 C-2.814375 4.7934375 -2.814375 4.7934375 -2.625 3.5625 C-2.41875 2.716875 -2.2125 1.87125 -2 1 C-1.34 0.67 -0.68 0.34 0 0 Z " fill="#E5EBF2" transform="translate(29,48)"/>
                        <path d="M0 0 C0.66 0.66 1.32 1.32 2 2 C1.5625 4.375 1.5625 4.375 0 7 C-2.94119871 8.07001562 -5.90584243 8.57343918 -9 9 C-8.2575 8.443125 -7.515 7.88625 -6.75 7.3125 C-4.08292005 5.06972822 -2.08443768 2.77925025 0 0 Z " fill="#ECEDEE" transform="translate(183,191)"/>
                        <path d="M0 0 C0.33 0.66 0.66 1.32 1 2 C1.66 2 2.32 2 3 2 C3.33 3.32 3.66 4.64 4 6 C4.99 6 5.98 6 7 6 C6.67 7.32 6.34 8.64 6 10 C3.54896452 9.01958581 2.23241214 8.3486182 0.75 6.125 C0 4 0 4 0 0 Z " fill="#ECEDEC" transform="translate(32,182)"/>
                        <path d="M0 0 C-0.33 1.32 -0.66 2.64 -1 4 C-1.66 3.79375 -2.32 3.5875 -3 3.375 C-7.09630108 2.86296237 -10.04235979 3.85966299 -14 5 C-14 4.34 -14 3.68 -14 3 C-12.04486839 2.303447 -10.08577524 1.61800435 -8.125 0.9375 C-7.03445312 0.55464844 -5.94390625 0.17179688 -4.8203125 -0.22265625 C-2 -1 -2 -1 0 0 Z " fill="#1867AC" transform="translate(133,147)"/>
                        <path d="M0 0 C0.66 0 1.32 0 2 0 C3.5078125 1.64453125 3.5078125 1.64453125 5.125 3.8125 C5.66382813 4.52019531 6.20265625 5.22789062 6.7578125 5.95703125 C8 8 8 8 8 11 C7.34 11 6.68 11 6 11 C5.67 9.68 5.34 8.36 5 7 C3.68 6.67 2.36 6.34 1 6 C0.67 4.02 0.34 2.04 0 0 Z " fill="#E0E2E2" transform="translate(24,171)"/>
                        <path d="M0 0 C0.66 0 1.32 0 2 0 C2.33 1.98 2.66 3.96 3 6 C-0.63 6 -4.26 6 -8 6 C-8 5.34 -8 4.68 -8 4 C-3.25 2.875 -3.25 2.875 -1 4 C-0.67 2.68 -0.34 1.36 0 0 Z " fill="#1476D3" transform="translate(133,146)"/>
                        <path d="M0 0 C2.50037734 2.17424117 3.43628586 3.73045798 4 7 C1.69 6.34 -0.62 5.68 -3 5 C-3 4.01 -3 3.02 -3 2 C-2.01 2 -1.02 2 0 2 C0 1.34 0 0.68 0 0 Z " fill="#2695F7" transform="translate(199,57)"/>
                        <path d="M0 0 C0 1.65 0 3.3 0 5 C-3.3 5 -6.6 5 -10 5 C-3.33333333 0 -3.33333333 0 0 0 Z " fill="#3B9DF5" transform="translate(70,19)"/>
                        <path d="M0 0 C0 0.66 0 1.32 0 2 C-0.99 2.33 -1.98 2.66 -3 3 C-3.33 3.66 -3.66 4.32 -4 5 C-4.66 5 -5.32 5 -6 5 C-6 4.34 -6 3.68 -6 3 C-6.99 3.66 -7.98 4.32 -9 5 C-11.6875 5.125 -11.6875 5.125 -14 5 C-9.67612562 1.34133706 -5.65076098 0 0 0 Z " fill="#4BA4F4" transform="translate(84,14)"/>
                        <path d="M0 0 C-1.50223584 4.20626034 -4.28550034 5.73900021 -8 8 C-8.33 6.68 -8.66 5.36 -9 4 C-2.25 0 -2.25 0 0 0 Z " fill="#DBD7D4" transform="translate(182,192)"/>
                        <path d="M0 0 C0.99 0 1.98 0 3 0 C1.68938409 4.23429756 0.05643741 8.07407404 -2 12 C-2.33 12 -2.66 12 -3 12 C-3.34833144 7.12335991 -2.41685712 4.22949995 0 0 Z " fill="#E9EDEF" transform="translate(20,60)"/>
                        <path d="M0 0 C0 0.66 0 1.32 0 2 C0.66 2.66 1.32 3.32 2 4 C-1.3 4.33 -4.6 4.66 -8 5 C-8 3.68 -8 2.36 -8 1 C-5.23735711 0.40267181 -2.83967231 0 0 0 Z " fill="#248FEF" transform="translate(112,51)"/>
                        <path d="M0 0 C3.3 0.33 6.6 0.66 10 1 C10.33 2.65 10.66 4.3 11 6 C7.2089881 4.55049545 3.6125362 2.84827434 0 1 C0 0.67 0 0.34 0 0 Z " fill="#D0E5F9" transform="translate(154,18)"/>
                        <path d="M0 0 C2.97 0.33 5.94 0.66 9 1 C8.67 1.99 8.34 2.98 8 4 C8.99 4.33 9.98 4.66 11 5 C8.45297384 6.27351308 7.5717055 5.80191925 4.875 5.0625 C4.15054688 4.86785156 3.42609375 4.67320313 2.6796875 4.47265625 C2.12539062 4.31667969 1.57109375 4.16070313 1 4 C1.99 3.67 2.98 3.34 4 3 C4 2.34 4 1.68 4 1 C2.68 0.67 1.36 0.34 0 0 Z " fill="#E9F4FC" transform="translate(132,8)"/>
                        <path d="M0 0 C3.69293736 0.6594531 4.70572579 1.52929434 8 4 C2.555 5.485 2.555 5.485 -3 7 C-2.67 6.01 -2.34 5.02 -2 4 C-1.34 4 -0.68 4 0 4 C0 2.68 0 1.36 0 0 Z " fill="#E8F1F8" transform="translate(80,9)"/>
                        <path d="M0 0 C3.63 0 7.26 0 11 0 C11 0.66 11 1.32 11 2 C9.741875 2.185625 8.48375 2.37125 7.1875 2.5625 C6.12595703 2.71912109 6.12595703 2.71912109 5.04296875 2.87890625 C3 3 3 3 0 2 C0 1.34 0 0.68 0 0 Z " fill="#1566B5" transform="translate(107,170)"/>
                        <path d="M0 0 C4.17950077 3.45889719 5.32762134 6.98286401 7 12 C5.0625 11.25 5.0625 11.25 3 10 C2.25 7.875 2.25 7.875 2 6 C1.34 6 0.68 6 0 6 C0 4.02 0 2.04 0 0 Z " fill="#E7E6E4" transform="translate(16,156)"/>
                        <path d="M0 0 C0.8971875 0.5259375 0.8971875 0.5259375 1.8125 1.0625 C-3.4609375 4.28515625 -3.4609375 4.28515625 -5.1875 5.0625 C-5.8475 4.7325 -6.5075 4.4025 -7.1875 4.0625 C-6.375 2.125 -6.375 2.125 -5.1875 0.0625 C-2.1875 -0.9375 -2.1875 -0.9375 0 0 Z " fill="#EDF5F7" transform="translate(55.1875,24.9375)"/>
                        <path d="M0 0 C0.66 0.66 1.32 1.32 2 2 C-2.2837641 4.57025846 -6.1725201 6.58707905 -11 8 C-11 7.01 -11 6.02 -11 5 C-10.37351563 4.72285156 -9.74703125 4.44570312 -9.1015625 4.16015625 C-8.28429687 3.79792969 -7.46703125 3.43570313 -6.625 3.0625 C-5.81289062 2.70285156 -5.00078125 2.34320313 -4.1640625 1.97265625 C-2.76316215 1.3430097 -1.37374716 0.68687358 0 0 Z " fill="#DFE0E1" transform="translate(163,205)"/>
                        <path d="M0 0 C2.78637633 4.1795645 1.79562512 6.14668677 1 11 C0.01 11.33 -0.98 11.66 -2 12 C-2.21278058 7.53160785 -1.59138085 4.17737474 0 0 Z " fill="#EEF4F6" transform="translate(214,141)"/>
                        <path d="M0 0 C0.66 0 1.32 0 2 0 C5 5.75 5 5.75 5 8 C4.01 8 3.02 8 2 8 C1.34 7.01 0.68 6.02 0 5 C-0.66 5 -1.32 5 -2 5 C-2 4.01 -2 3.02 -2 2 C-1.34 2 -0.68 2 0 2 C0 1.34 0 0.68 0 0 Z " fill="#2194F9" transform="translate(203,66)"/>
                        <path d="M0 0 C1.98 0 3.96 0 6 0 C6.66 2.64 7.32 5.28 8 8 C3.79373966 6.49776416 2.26099979 3.71449966 0 0 Z " fill="#E7ECF1" transform="translate(192,47)"/>
                        <path d="M0 0 C1.32 0.66 2.64 1.32 4 2 C1.29730077 4.70269923 -1.4252738 5.70570258 -5 7 C-7.2265625 6.58203125 -7.2265625 6.58203125 -9 6 C-8.43410156 5.73445312 -7.86820313 5.46890625 -7.28515625 5.1953125 C-6.55167969 4.84210938 -5.81820312 4.48890625 -5.0625 4.125 C-4.33160156 3.77695313 -3.60070312 3.42890625 -2.84765625 3.0703125 C-0.83667541 2.1315023 -0.83667541 2.1315023 0 0 Z " fill="#1B79D1" transform="translate(153,203)"/>
                        <path d="M0 0 C2.97 0.33 5.94 0.66 9 1 C9.33 2.65 9.66 4.3 10 6 C6.40992874 4.66654496 3.20429093 3.1056769 0 1 C0 0.67 0 0.34 0 0 Z " fill="#2285E0" transform="translate(54,197)"/>
                        <path d="M0 0 C0.66 0.33 1.32 0.66 2 1 C-1.465 3.97 -1.465 3.97 -5 7 C-5.66 5.35 -6.32 3.7 -7 2 C-4 1 -4 1 -2 1 C-1.34 0.67 -0.68 0.34 0 0 Z " fill="#137DDB" transform="translate(183,185)"/>
                        <path d="M0 0 C5.94 0.66 11.88 1.32 18 2 C18 2.33 18 2.66 18 3 C12.06 3 6.12 3 0 3 C0 2.01 0 1.02 0 0 Z " fill="#E7F3FC" transform="translate(99,138)"/>
                        <path d="M0 0 C3.36720387 1.39332574 4.9859524 2.9789286 7 6 C4.625 6.625 4.625 6.625 2 7 C1.34 6.34 0.68 5.68 0 5 C0.33 4.67 0.66 4.34 1 4 C0.59070014 1.94603274 0.59070014 1.94603274 0 0 Z " fill="#1A78CA" transform="translate(80,137)"/>
                        <path d="M0 0 C2.475 0.495 2.475 0.495 5 1 C5 1.66 5 2.32 5 3 C5.99 3 6.98 3 8 3 C8 3.99 8 4.98 8 6 C8.66 6 9.32 6 10 6 C9.67 6.66 9.34 7.32 9 8 C7.49712782 6.85793642 5.99776716 5.71125043 4.5 4.5625 C3.6646875 3.92441406 2.829375 3.28632813 1.96875 2.62890625 C1.3190625 2.09136719 0.669375 1.55382812 0 1 C0 0.67 0 0.34 0 0 Z " fill="#DCE9F2" transform="translate(171,27)"/>
                        <path d="M0 0 C-2.85306797 2.32472205 -5.54074837 3.7508258 -9 5 C-8.75 3.125 -8.75 3.125 -8 1 C-5.08518252 -1.1107299 -3.34823603 -1.19579858 0 0 Z " fill="#EEF4F5" transform="translate(68,19)"/>
                        <path d="M0 0 C0.33 0 0.66 0 1 0 C1.33 1.98 1.66 3.96 2 6 C2.66 6 3.32 6 4 6 C4.33 7.65 4.66 9.3 5 11 C4.34 11 3.68 11 3 11 C2.67 11.66 2.34 12.32 2 13 C0.24252386 8.49646738 -0.19294408 4.82360189 0 0 Z " fill="#1879C8" transform="translate(81,110)"/>
                        <path d="M0 0 C1.65 0 3.3 0 5 0 C5 0.99 5 1.98 5 3 C2.5 5.1875 2.5 5.1875 0 7 C0 4.69 0 2.38 0 0 Z " fill="#EBF1F3" transform="translate(40,32)"/>
                        <path d="M0 0 C2.3125 0.1875 2.3125 0.1875 4 1 C2.47058649 4.05882701 0.05780454 4.68951234 -3 6 C-3.66 5.67 -4.32 5.34 -5 5 C-2.75 2.4375 -2.75 2.4375 0 0 Z " fill="#CDCCCC" transform="translate(163,202)"/>
                        <path d="M0 0 C0.99 0.33 1.98 0.66 3 1 C1.75023244 4.65316671 1.32901247 5.78065836 -2 8 C-1.125 1.125 -1.125 1.125 0 0 Z " fill="#1981E1" transform="translate(195,168)"/>
                        <path d="M0 0 C4.67692308 1.47692308 4.67692308 1.47692308 6.3125 4.125 C6.539375 4.74375 6.76625 5.3625 7 6 C6.01 5.67 5.02 5.34 4 5 C2.63106761 4.94729537 2.63106761 4.94729537 0 6 C0 4.02 0 2.04 0 0 Z " fill="#1379D9" transform="translate(88,145)"/>
                        <path d="M0 0 C3.96 0 7.92 0 12 0 C12 0.66 12 1.32 12 2 C6.140625 3.07421875 6.140625 3.07421875 4 3 C2.68 2.01 1.36 1.02 0 0 Z " fill="#2D97F6" transform="translate(84,13)"/>
                        <path d="M0 0 C1.32 0.33 2.64 0.66 4 1 C3.34 1 2.68 1 2 1 C2 1.99 2 2.98 2 4 C3.32 4.33 4.64 4.66 6 5 C0.25 5.125 0.25 5.125 -2 4 C-1.34 2.68 -0.68 1.36 0 0 Z " fill="#FCF8F1" transform="translate(142,8)"/>
                        <path d="M0 0 C3.16115776 1.36983503 3.9927092 1.9890638 6 5 C0.25 4.25 0.25 4.25 -2 2 C-1.34 2 -0.68 2 0 2 C0 1.34 0 0.68 0 0 Z " fill="#1780DE" transform="translate(70,203)"/>
                        <path d="M0 0 C1.65 0 3.3 0 5 0 C5.66 1.32 6.32 2.64 7 4 C4.69 3.67 2.38 3.34 0 3 C0 2.01 0 1.02 0 0 Z " fill="#1884EA" transform="translate(104,172)"/>
                        <path d="M0 0 C1.1875 1.625 1.1875 1.625 2 4 C0.625 7.25 0.625 7.25 -1 10 C-1.66 9.01 -2.32 8.02 -3 7 C-2.690625 6.401875 -2.38125 5.80375 -2.0625 5.1875 C-0.89790296 2.91043228 -0.89790296 2.91043228 0 0 Z " fill="#1C82D9" transform="translate(203,155)"/>
                        <path d="M0 0 C0.66 0.33 1.32 0.66 2 1 C1.74438677 3.3431213 1.40729228 5.67843403 1 8 C0.01 8.495 0.01 8.495 -1 9 C-1.625 6.1875 -1.625 6.1875 -2 3 C-1.34 2.01 -0.68 1.02 0 0 Z " fill="#2095FC" transform="translate(14,85)"/>
                        <path d="M0 0 C3.79303725 1.00193437 6.71536341 1.81024227 10 4 C6.05272412 4.17942163 3.4019487 4.09350689 0 2 C0 1.34 0 0.68 0 0 Z " fill="#B7C0C9" transform="translate(70,207)"/>
                        <path d="M0 0 C1.98 0.66 3.96 1.32 6 2 C5.67 2.99 5.34 3.98 5 5 C3.35 4.67 1.7 4.34 0 4 C0 2.68 0 1.36 0 0 Z " fill="#0E87EF" transform="translate(152,200)"/>
                        <path d="M0 0 C0.33 0 0.66 0 1 0 C1.28571429 7.42857143 1.28571429 7.42857143 -1 11 C-2.23076923 4.6 -2.23076923 4.6 -1.0625 1.5625 C-0.711875 1.046875 -0.36125 0.53125 0 0 Z " fill="#0B89F6" transform="translate(213,125)"/>
                        <path d="M0 0 C0.99 0.33 1.98 0.66 3 1 C1.35 2.65 -0.3 4.3 -2 6 C-2.33 5.01 -2.66 4.02 -3 3 C-2.01 2.01 -1.02 1.02 0 0 Z " fill="#E9EDF1" transform="translate(35,40)"/>
                        <path d="M0 0 C0.99 0.33 1.98 0.66 3 1 C3 1.99 3 2.98 3 4 C1.35 4.66 -0.3 5.32 -2 6 C-1.34 4.02 -0.68 2.04 0 0 Z " fill="#E2E0DE" transform="translate(186,186)"/>
                        <path d="M0 0 C0.99 0 1.98 0 3 0 C3.66 1.65 4.32 3.3 5 5 C4.01 5.33 3.02 5.66 2 6 C1.34 4.02 0.68 2.04 0 0 Z " fill="#1A7FDA" transform="translate(129,64)"/>
                        <path d="M0 0 C0 0.99 0 1.98 0 3 C-0.66 3 -1.32 3 -2 3 C-2 3.66 -2 4.32 -2 5 C-3.65 5 -5.3 5 -7 5 C-2.25 0 -2.25 0 0 0 Z " fill="#3FA1F6" transform="translate(60,24)"/>
                        <path d="M0 0 C1 3 1 3 1 5 C-1.64 4.34 -4.28 3.68 -7 3 C-7 2.67 -7 2.34 -7 2 C-4.69 1.34 -2.38 0.68 0 0 Z " fill="#E1F0FB" transform="translate(151,12)"/>
                        <path d="M0 0 C3.3 0.99 6.6 1.98 10 3 C9.67 3.66 9.34 4.32 9 5 C6.03 4.01 3.06 3.02 0 2 C0 1.34 0 0.68 0 0 Z " fill="#DBDBDA" transform="translate(64,207)"/>
                        <path d="M0 0 C1.65 0 3.3 0 5 0 C3.35 1.65 1.7 3.3 0 5 C-0.66 4.01 -1.32 3.02 -2 2 C-1.34 2 -0.68 2 0 2 C0 1.34 0 0.68 0 0 Z " fill="#177CD6" transform="translate(187,178)"/>
                        <path d="M0 0 C1.32 0.33 2.64 0.66 4 1 C4.33 2.65 4.66 4.3 5 6 C3 6 3 6 1.375 4.6875 C0 3 0 3 0 0 Z " fill="#1290FA" transform="translate(24,162)"/>
                        <path d="M0 0 C0.66 0 1.32 0 2 0 C2.33 2.31 2.66 4.62 3 7 C2.01 7.495 2.01 7.495 1 8 C-0.35439668 5.29120665 -0.06501451 2.99066732 0 0 Z " fill="#FCF6EF" transform="translate(9,144)"/>
                        <path d="M0 0 C0 0.66 0 1.32 0 2 C0.66 2.33 1.32 2.66 2 3 C0.02 3.99 0.02 3.99 -2 5 C-2.99 3.68 -3.98 2.36 -5 1 C-2 0 -2 0 0 0 Z " fill="#ECF3F6" transform="translate(104,120)"/>
                        </svg>`;
                        micButton.classList.remove('recording');

                        if (audioChunks.length === 0) {
                            // console.log('No audio recorded');
                            return;
                        }

                        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
                        const audioFile = new File([audioBlob], `recording-${Date.now()}.webm`, {
                            type: 'audio/webm'
                        });

                        // console.log('Audio file created:', audioFile);

                        // Add to current files and show preview (but do not send yet)
                        currentFiles = [audioFile];
                        renderFilePreviews();
                        updateButtonVisibility();

                        // Stop the audio stream
                        stream.getTracks().forEach(track => track.stop());
                        stream = null;
                    };

                    // Start audio recording
                    mediaRecorder.start();
                    // console.log('MediaRecorder started');

                    // Start speech recognition immediately after
                    try {
                        finalTranscript = ''; // Reset transcript only when starting a new session
                        recognition.start();
                        // console.log('Speech recognition started');
                    } catch (error) {
                        console.error('Speech recognition start error:', error);
                        textarea.value += `\n[Error starting speech recognition: ${error.message}]`;
                        autoResizeTextarea(textarea); // Resize after error message
                    }

                    // Update mic button UI
                    micButton.innerHTML = `
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30">
                            <path fill="currentColor" d="M6 6h12v12H6z"/>
                        </svg>
                    `;
                    micButton.title = 'Stop recording';
                    micButton.classList.add('recording');
                    isRecording = true;

                } catch (error) {
                    console.error('Error accessing microphone:', error);
                    const errorMessageDiv = document.createElement('div');
                    errorMessageDiv.className = 'chat-message bot';
                    errorMessageDiv.innerHTML = `
                        <div class="avatar bot-avatar"></div>
                        <div class="message-bubble">Sorry, I couldn't access your microphone. Please check permissions and try again.</div>
                    `;
                    messagesContainer.appendChild(errorMessageDiv);
                    messagesContainer.scrollTop = messagesContainer.scrollHeight;
                    stream = null;
                }
            } else {
                // Stop both recording and speech recognition
                try {
                    if (mediaRecorder && mediaRecorder.state === 'recording') {
                        mediaRecorder.stop();
                    }
                    recognition.stop();
                    isRecording = false; // Ensure isRecording is set to false to prevent restarts
                } catch (error) {
                    console.error('Error stopping recording or recognition:', error);
                }

                micButton.innerHTML = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 225 225">
                        <path d="M0 0 C74.25 0 148.5 0 225 0 C225 74.25 225 148.5 225 225 C150.75 225 76.5 225 0 225 C0 150.75 0 76.5 0 0 Z " fill="#1A8CF5"/>
                        <path d="M0 0 C74.25 0 148.5 0 225 0 C225 74.25 225 148.5 225 225 C150.75 225 76.5 225 0 225 C0 150.75 0 76.5 0 0 Z M33.52099609 45.22900391 C29.06400389 50.41857396 25.46444198 56.11895674 22 62 C21.62472168 62.61681641 21.24944336 63.23363281 20.86279297 63.86914062 C8.53024002 84.46833269 6.14187949 112.96639212 11.54272461 136.10839844 C12.53793266 139.79982518 13.70155834 143.40494534 15 147 C15.59361328 148.68416016 15.59361328 148.68416016 16.19921875 150.40234375 C24.69539365 172.33433011 42.26561819 194.2061119 64 204 C64.56460938 204.31324219 65.12921875 204.62648437 65.7109375 204.94921875 C87.1798995 216.80871086 112.55255635 218.5723863 136 213 C137.17046875 212.73316406 138.3409375 212.46632812 139.546875 212.19140625 C164.2565814 205.90217102 186.56002795 189.1073612 200.25 167.6875 C210.53091588 150.22032776 215.45192313 132.75105937 215.4375 112.5625 C215.4375705 111.85412994 215.43764099 111.14575989 215.43771362 110.41592407 C215.39285102 98.67334417 214.36340714 87.98823158 210 77 C209.68885254 76.20851563 209.37770508 75.41703125 209.05712891 74.6015625 C204.3602331 63.04277767 198.33183926 53.26531944 190 44 C189.19820312 43.09894531 188.39640625 42.19789062 187.5703125 41.26953125 C168.72695623 21.3449988 141.53826676 9.57859137 114.20654297 8.71459961 C83.01212607 8.29590792 54.32788842 22.37027628 33.52099609 45.22900391 Z " fill="#FDFDFD" transform="translate(0,0)"/>
                        <path d="M0 0 C9.43911429 8.36648766 9.43911429 8.36648766 9.90390015 14.45280457 C9.91676056 15.22143326 9.92962097 15.99006195 9.94287109 16.78198242 C9.95893402 17.65686813 9.97499695 18.53175385 9.99154663 19.43315125 C10.03621625 23.43890455 10.07707677 27.44449492 10.10009766 31.45043945 C10.11662988 33.55797387 10.14388358 35.66545285 10.18212891 37.77270508 C10.23713828 40.82142031 10.25881029 43.8688228 10.2734375 46.91796875 C10.29610687 47.85158737 10.31877625 48.78520599 10.34213257 49.74711609 C10.3214097 56.22308454 8.86755592 60.40680985 4.75 65.4375 C0.6521656 69.33044268 -2.94933739 71.17704763 -8.5625 71.8125 C-14.49635577 71.20905704 -19.15779281 69.01561525 -23.125 64.5 C-27.28063419 58.51099779 -27.56859149 53.70975762 -27.5859375 46.60546875 C-27.5925943 45.6548909 -27.5992511 44.70431305 -27.60610962 43.72492981 C-27.61621679 41.71694874 -27.62092724 39.70893421 -27.62060547 37.70092773 C-27.62497035 34.64575122 -27.66128779 31.59202976 -27.69921875 28.53710938 C-27.70508915 26.58073407 -27.70905705 24.62435195 -27.7109375 22.66796875 C-27.72530853 21.76249802 -27.73967957 20.85702728 -27.75448608 19.92411804 C-27.70742842 13.31528905 -26.39869045 7.834048 -21.80258179 2.87614441 C-15.79732024 -2.44667155 -7.23520383 -3.47846338 0 0 Z " fill="#FAFCFD" transform="translate(121.25,56.5625)"/>
                        <path d="M0 0 C0.66 0 1.32 0 2 0 C1.7834375 0.97453125 1.566875 1.9490625 1.34375 2.953125 C-2.85656037 23.57396151 -3.19885228 45.06820928 4 65 C4.59361328 66.68416016 4.59361328 66.68416016 5.19921875 68.40234375 C13.56166262 89.98911747 30.58814616 111.35144858 52 121 C52.56460938 121.31324219 53.12921875 121.62648438 53.7109375 121.94921875 C75.1798995 133.80871086 100.55255635 135.5723863 124 130 C125.17046875 129.73316406 126.3409375 129.46632812 127.546875 129.19140625 C151.82183015 123.01282604 173.71715272 106.81179537 187.1875 85.75 C196.92100603 69.30774279 202.07008316 52.40402337 202.625 33.375 C202.68300781 31.72564453 202.68300781 31.72564453 202.7421875 30.04296875 C202.83543388 27.36213541 202.92123267 24.6812911 203 22 C203.33 22 203.66 22 204 22 C204.75131468 34.43161732 205.25646855 46.5899568 204 59 C203.34 59 202.68 59 202 59 C202.0309375 60.2065625 202.0309375 60.2065625 202.0625 61.4375 C202 64 202 64 201 65 C200.9175 66.0725 200.835 67.145 200.75 68.25 C199.85585927 72.72070366 198.32087939 74.01120855 195 77 C194.67 77.99 194.34 78.98 194 80 C193.34 80 192.68 80 192 80 C191.79890625 80.85271484 191.79890625 80.85271484 191.59375 81.72265625 C190.99791878 84.00798257 190.27331076 86.20649845 189.5 88.4375 C188.42789949 91.60673369 187.53416966 94.68814809 187 98 C186.01 97.67 185.02 97.34 184 97 C184.33 97.99 184.66 98.98 185 100 C184.01 100 183.02 100 182 100 C181.731875 100.763125 181.46375 101.52625 181.1875 102.3125 C179.66917942 105.74869921 178.03144034 107.3123731 174.9375 109.375 C172.78065401 110.87132414 172.78065401 110.87132414 172.3125 113.5 C171 116 171 116 168.9140625 116.8828125 C167.28617754 117.37066446 165.64615601 117.81998716 163.99609375 118.2265625 C163.33738281 118.48179687 162.67867187 118.73703125 162 119 C161.67 119.99 161.34 120.98 161 122 C158.39757586 123.64820195 157.13751221 124 154 124 C154 124.66 154 125.32 154 126 C152.700625 126.37125 152.700625 126.37125 151.375 126.75 C146.92540275 128.39799898 143.35658348 130.64341652 140 134 C138.989375 133.979375 137.97875 133.95875 136.9375 133.9375 C132.78794423 134.00336596 129.92483318 134.87344507 126.078125 136.2734375 C124 137 124 137 121.125 137.5625 C118.71228471 137.92060157 118.71228471 137.92060157 116 140 C113.3203125 140.25878906 113.3203125 140.25878906 110.125 140.265625 C108.97515625 140.26820313 107.8253125 140.27078125 106.640625 140.2734375 C105.43921875 140.26570312 104.2378125 140.25796875 103 140.25 C101.79859375 140.25773438 100.5971875 140.26546875 99.359375 140.2734375 C97.63460937 140.26957031 97.63460937 140.26957031 95.875 140.265625 C94.29332031 140.26224121 94.29332031 140.26224121 92.6796875 140.25878906 C90 140 90 140 87 138 C85.10507691 137.73404588 83.20819733 137.47648178 81.3046875 137.28125 C78.8520691 136.98194742 76.47931777 136.51197386 74.0625 136 C69.38567676 135.02838091 64.75334236 134.46000087 60 134 C59.67 132.02 59.34 130.04 59 128 C58.154375 128.061875 57.30875 128.12375 56.4375 128.1875 C51.64394383 127.9260333 48.27895302 126.13947651 44 124 C43.67 123.34 43.34 122.68 43 122 C40.97536745 121.34786708 40.97536745 121.34786708 39 121 C39 120.01 39 119.02 39 118 C36.03 117.505 36.03 117.505 33 117 C32.67 115.68 32.34 114.36 32 113 C30.68 112.67 29.36 112.34 28 112 C27.67 110.02 27.34 108.04 27 106 C26.01 106 25.02 106 24 106 C23.67 104.68 23.34 103.36 23 102 C22.34 102 21.68 102 21 102 C21 101.34 21 100.68 21 100 C20.01 100 19.02 100 18 100 C17.67 98.68 17.34 97.36 17 96 C15.68 95.67 14.36 95.34 13 95 C12.67 92.03 12.34 89.06 12 86 C10.68 85.67 9.36 85.34 8 85 C6.75 82.4375 6.75 82.4375 6 80 C5.34 80 4.68 80 4 80 C4 76.7 4 73.4 4 70 C2.515 70.495 2.515 70.495 1 71 C-1.77042109 68.22957891 -1.39796106 66.23466195 -1.625 62.375 C-1.69976562 61.18648437 -1.77453125 59.99796875 -1.8515625 58.7734375 C-1.90054687 57.85820312 -1.94953125 56.94296875 -2 56 C-2.66 56 -3.32 56 -4 56 C-4.05064156 49.21902652 -4.08570883 42.43810167 -4.10986328 35.65698242 C-4.11993107 33.3493467 -4.13358623 31.04172375 -4.15087891 28.73413086 C-4.17509287 25.42037809 -4.18647526 22.10679374 -4.1953125 18.79296875 C-4.20563507 17.7585112 -4.21595764 16.72405365 -4.22659302 15.6582489 C-4.22674408 14.6974794 -4.22689514 13.7367099 -4.22705078 12.74682617 C-4.231492 11.90077316 -4.23593323 11.05472015 -4.24050903 10.18302917 C-4 8 -4 8 -2 5 C-1.67 5 -1.34 5 -1 5 C-0.67 3.35 -0.34 1.7 0 0 Z " fill="#CACED3" transform="translate(12,82)"/>
                        <path d="M0 0 C3.3 0 6.6 0 10 0 C10.27972656 1.0621875 10.55945313 2.124375 10.84765625 3.21875 C13.45121026 12.6024157 15.80873797 20.21645098 24.53125 25.546875 C33.32990416 30.15322923 42.8912126 31.97979216 52.70703125 29.24609375 C54.90913936 28.28947098 56.93906262 27.22888192 59 26 C60.051875 25.4225 61.10375 24.845 62.1875 24.25 C69.0692032 18.74463744 72.4829887 12.30428587 73.625 3.625 C73.810625 1.830625 73.810625 1.830625 74 0 C77.63 0 81.26 0 85 0 C85.93801209 9.75532575 81.76242077 18.70152847 75.65234375 26.1953125 C68.00850509 34.54390224 60.29861934 39.38591152 49 41 C49 47.6 49 54.2 49 61 C44.71 61 40.42 61 36 61 C36 54.4 36 47.8 36 41 C33.69 40.67 31.38 40.34 29 40 C17.64646151 35.84988149 8.2245018 28.0226744 3 17 C0.76743274 11.26944275 -0.40060407 6.14259575 0 0 Z " fill="#F0F6F9" transform="translate(70,109)"/>
                        <path d="M0 0 C0.99 0 1.98 0 3 0 C5.1519437 3.22791555 5.20086443 4.28400809 5 8 C5.66 8.33 6.32 8.66 7 9 C6.67 21.87 6.34 34.74 6 48 C8.97 48 11.94 48 15 48 C14.73766655 56.26350363 12.29447636 61.66236307 6.4453125 67.5703125 C-1.50958713 74.45356762 -9.02456163 76.50124515 -19.3984375 76.3046875 C-29.19187782 75.4761752 -36.56546694 71.39770641 -43 64 C-47.06273937 57.68643549 -48.11999352 52.31960492 -48 45 C-47.34 45 -46.68 45 -46 45 C-45.566875 45.94875 -45.13375 46.8975 -44.6875 47.875 C-43.20697799 51.20041937 -43.20697799 51.20041937 -40 53 C-40 53.99 -40 54.98 -40 56 C-38.515 55.505 -38.515 55.505 -37 55 C-36.01 55.33 -35.02 55.66 -34 56 C-34.33 54.02 -34.66 52.04 -35 50 C-34.608125 50.53625 -34.21625 51.0725 -33.8125 51.625 C-33.214375 52.40875 -32.61625 53.1925 -32 54 C-31.2575 55.010625 -30.515 56.02125 -29.75 57.0625 C-26.17085869 61.29531682 -21.99983627 62.74547538 -16.5625 63.4375 C-10.82053837 62.73234682 -6.61494733 60.69994456 -2.625 56.5 C-0.15646679 52.70225661 1.25134514 50.07916154 1.24291992 45.49438477 C1.24599655 44.60989151 1.24907318 43.72539825 1.25224304 42.81410217 C1.24505753 41.86611252 1.23787201 40.91812286 1.23046875 39.94140625 C1.23001053 38.96010239 1.22955231 37.97879852 1.2290802 36.96775818 C1.2260616 34.89410187 1.21818702 32.82044775 1.20581055 30.74682617 C1.18758844 27.57788018 1.18530074 24.40922723 1.18554688 21.24023438 C1.18062998 19.22395581 1.17480091 17.20767923 1.16796875 15.19140625 C1.16685593 14.24544083 1.1657431 13.2994754 1.16459656 12.32484436 C1.13420122 8.0958628 1.08260843 4.1203915 0 0 Z " fill="#187AD3" transform="translate(129,64)"/>
                        <path d="M0 0 C0.33 0 0.66 0 1 0 C1.75131468 12.43161732 2.25646855 24.5899568 1 37 C0.34 37 -0.32 37 -1 37 C-0.979375 37.804375 -0.95875 38.60875 -0.9375 39.4375 C-1 42 -1 42 -2 43 C-2.0825 44.0725 -2.165 45.145 -2.25 46.25 C-3.14414073 50.72070366 -4.67912061 52.01120855 -8 55 C-8.33 55.99 -8.66 56.98 -9 58 C-9.66 58 -10.32 58 -11 58 C-11.1340625 58.56847656 -11.268125 59.13695312 -11.40625 59.72265625 C-12.00208122 62.00798257 -12.72668924 64.20649845 -13.5 66.4375 C-14.57210051 69.60673369 -15.46583034 72.68814809 -16 76 C-17.485 75.505 -17.485 75.505 -19 75 C-18.67 75.99 -18.34 76.98 -18 78 C-18.99 78 -19.98 78 -21 78 C-21.268125 78.763125 -21.53625 79.52625 -21.8125 80.3125 C-23.33082058 83.74869921 -24.96855966 85.3123731 -28.0625 87.375 C-30.21934599 88.87132414 -30.21934599 88.87132414 -30.6875 91.5 C-32 94 -32 94 -34.0859375 94.8828125 C-35.71382246 95.37066446 -37.35384399 95.81998716 -39.00390625 96.2265625 C-39.66261719 96.48179687 -40.32132812 96.73703125 -41 97 C-41.495 98.485 -41.495 98.485 -42 100 C-44.60242414 101.64820195 -45.86248779 102 -49 102 C-49 102.66 -49 103.32 -49 104 C-49.86625 104.2475 -50.7325 104.495 -51.625 104.75 C-56.07459725 106.39799898 -59.64341652 108.64341652 -63 112 C-64.010625 111.979375 -65.02125 111.95875 -66.0625 111.9375 C-70.21205577 112.00336596 -73.07516682 112.87344507 -76.921875 114.2734375 C-79 115 -79 115 -81.875 115.5625 C-84.28771529 115.92060157 -84.28771529 115.92060157 -87 118 C-89.6796875 118.25878906 -89.6796875 118.25878906 -92.875 118.265625 C-94.02484375 118.26820313 -95.1746875 118.27078125 -96.359375 118.2734375 C-97.56078125 118.26570313 -98.7621875 118.25796875 -100 118.25 C-101.20140625 118.25773437 -102.4028125 118.26546875 -103.640625 118.2734375 C-105.36539063 118.26957031 -105.36539063 118.26957031 -107.125 118.265625 C-108.70667969 118.26224121 -108.70667969 118.26224121 -110.3203125 118.25878906 C-113 118 -113 118 -116 116 C-118.0492094 115.54860541 -118.0492094 115.54860541 -120.1875 115.375 C-122.0746875 115.189375 -122.0746875 115.189375 -124 115 C-124 114.67 -124 114.34 -124 114 C-111.79 114 -99.58 114 -87 114 C-87 113.34 -87 112.68 -87 112 C-84.31275296 111.51937876 -81.62521967 111.04046504 -78.9375 110.5625 C-78.18533203 110.42779297 -77.43316406 110.29308594 -76.65820312 110.15429688 C-72.11474542 109.3478823 -67.57195693 108.62538056 -63 108 C-63 107.34 -63 106.68 -63 106 C-53.58997722 101.59225513 -53.58997722 101.59225513 -49 101 C-48.505 99.515 -48.505 99.515 -48 98 C-46.35 98 -44.7 98 -43 98 C-42.79632813 96.96617187 -42.59265625 95.93234375 -42.3828125 94.8671875 C-41.08000195 90.32902605 -38.40881106 88.08436142 -34.875 85.125 C-33.6887604 84.0772066 -32.50516297 83.02641436 -31.32421875 81.97265625 C-30.75106934 81.46492676 -30.17791992 80.95719727 -29.58740234 80.43408203 C-13.53309571 65.9303913 -2.53799356 42.52690708 -0.74609375 20.94140625 C-0.58488906 17.75269893 -0.46806634 14.56639988 -0.375 11.375 C-0.33632812 10.27542969 -0.29765625 9.17585938 -0.2578125 8.04296875 C-0.16456612 5.36213541 -0.07876733 2.6812911 0 0 Z " fill="#E0E0E0" transform="translate(215,104)"/>
                        <path d="M0 0 C0.66 0 1.32 0 2 0 C2.433125 0.94875 2.86625 1.8975 3.3125 2.875 C4.79302201 6.20041937 4.79302201 6.20041937 8 8 C8 8.99 8 9.98 8 11 C8.99 10.67 9.98 10.34 11 10 C11.99 10.33 12.98 10.66 14 11 C13.67 9.02 13.34 7.04 13 5 C14.73930069 7.1345963 15.9340523 8.78566998 16.75 11.4375 C18.34737486 14.71211846 20.37201208 15.84721724 23.44140625 17.69140625 C25.39896483 19.33497047 25.43739757 20.56699126 26 23 C28.49034386 24.29660434 28.49034386 24.29660434 31 25 C31 25.99 31 26.98 31 28 C31.99 28 32.98 28 34 28 C34 28.66 34 29.32 34 30 C26.35571825 31.50379313 20.92820253 30.63855241 14 27 C6.63570956 21.90683424 2.81819868 16.45459603 0 8 C-0.12781786 5.32605036 -0.04391871 2.67904143 0 0 Z " fill="#197EDB" transform="translate(81,109)"/>
                        <path d="M0 0 C1.125 3.75 1.125 3.75 0 6 C-1.66666667 6.33333333 -3.33333333 6.66666667 -5 7 C-5.33 7.66 -5.66 8.32 -6 9 C-7.75631823 9.94394954 -9.55590347 10.8085551 -11.375 11.625 C-12.35210937 12.07101563 -13.32921875 12.51703125 -14.3359375 12.9765625 C-17 14 -17 14 -20 14 C-20 14.66 -20 15.32 -20 16 C-27.99730769 18.54824033 -35.62504986 19.61387352 -44 20 C-44 20.66 -44 21.32 -44 22 C-59.59631728 24.59938621 -76.97668397 23.78698848 -92 19 C-92 18.34 -92 17.68 -92 17 C-93.98 16.67 -95.96 16.34 -98 16 C-98 15.34 -98 14.68 -98 14 C-99.19625 13.731875 -100.3925 13.46375 -101.625 13.1875 C-105.37855376 12.25912994 -108.60088806 10.86951157 -112 9 C-112 8.01 -112 7.02 -112 6 C-112.66 6 -113.32 6 -114 6 C-113.67 5.34 -113.34 4.68 -113 4 C-112.48953125 4.30292969 -111.9790625 4.60585937 -111.453125 4.91796875 C-87.81847838 18.53722434 -62.37475409 22.26807427 -36 16 C-34.82953125 15.73316406 -33.6590625 15.46632812 -32.453125 15.19140625 C-20.73634994 12.2091954 -9.92394982 6.86100234 0 0 Z " fill="#C9C7C5" transform="translate(172,196)"/>
                        <path d="M0 0 C0.33 0 0.66 0 1 0 C1 2.31 1 4.62 1 7 C-1.31 7.33 -3.62 7.66 -6 8 C-6.33 10.31 -6.66 12.62 -7 15 C-7.83144531 14.98839844 -8.66289062 14.97679687 -9.51953125 14.96484375 C-11.14955078 14.95130859 -11.14955078 14.95130859 -12.8125 14.9375 C-14.43091797 14.92009766 -14.43091797 14.92009766 -16.08203125 14.90234375 C-19.06512169 14.86375234 -19.06512169 14.86375234 -22 16 C-22.33 23.59 -22.66 31.18 -23 39 C-25.97 39 -28.94 39 -32 39 C-32.66 37.68 -33.32 36.36 -34 35 C-36.01508358 34.26676204 -36.01508358 34.26676204 -38 34 C-39 33 -39 33 -39.09765625 30.27734375 C-39.08605469 29.17519531 -39.07445313 28.07304687 -39.0625 26.9375 C-39.05347656 25.83277344 -39.04445313 24.72804687 -39.03515625 23.58984375 C-39.02355469 22.73519531 -39.01195313 21.88054687 -39 21 C-40.65 20.67 -42.3 20.34 -44 20 C-44 19.34 -44 18.68 -44 18 C-44.99 17.67 -45.98 17.34 -47 17 C-47.99897738 15.22762078 -48.99542972 13.45335056 -49.94921875 11.65625 C-51.28368601 9.5528518 -52.64621769 8.75657288 -55 8 C-54.67 7.34 -54.34 6.68 -54 6 C-53.35933594 6.33773437 -52.71867187 6.67546875 -52.05859375 7.0234375 C-51.19363281 7.46945313 -50.32867187 7.91546875 -49.4375 8.375 C-48.59058594 8.81585938 -47.74367188 9.25671875 -46.87109375 9.7109375 C-43.39744746 11.35287685 -43.39744746 11.35287685 -37 13 C-37 19.6 -37 26.2 -37 33 C-32.71 33 -28.42 33 -24 33 C-24 26.4 -24 19.8 -24 13 C-21.875625 12.319375 -19.75125 11.63875 -17.5625 10.9375 C-10.64579985 8.58762644 -5.20158403 5.20158403 0 0 Z " fill="#1078D5" transform="translate(143,137)"/>
                        <path d="M0 0 C0.77069824 0.12600586 1.54139648 0.25201172 2.33544922 0.38183594 C5.86463418 1.01461178 8.16721313 1.61147542 11.1875 3.625 C1.23681133 5.68670091 -7.7915201 5.57692877 -17.8125 4.625 C-17.8125 3.965 -17.8125 3.305 -17.8125 2.625 C-23.0925 2.625 -28.3725 2.625 -33.8125 2.625 C-33.8125 3.285 -33.8125 3.945 -33.8125 4.625 C-41.25480769 5.98942308 -41.25480769 5.98942308 -44.078125 4.14453125 C-44.65046875 3.64308594 -45.2228125 3.14164063 -45.8125 2.625 C-30.32380003 -1.47950549 -15.8357503 -2.60778894 0 0 Z " fill="#1C91FC" transform="translate(129.8125,10.375)"/>
                        <path d="M0 0 C1.299375 -0.03867188 1.299375 -0.03867188 2.625 -0.078125 C5 0.25 5 0.25 6.80078125 1.578125 C8.60424096 4.09239456 8.1884797 6.23432485 8 9.25 C8 10.24 8 11.23 8 12.25 C8 14.91666667 8 17.58333333 8 20.25 C7.34 20.25 6.68 20.25 6 20.25 C5.67 21.57 5.34 22.89 5 24.25 C4.1028125 24.2809375 4.1028125 24.2809375 3.1875 24.3125 C0.56685398 25.15456616 0.56685398 25.15456616 -0.75 28.8125 C-1.1625 29.946875 -1.575 31.08125 -2 32.25 C-3.65 32.25 -5.3 32.25 -7 32.25 C-6.60167969 31.54875 -6.20335937 30.8475 -5.79296875 30.125 C-1.19202893 21.88584743 2.15388585 14.72647847 3 5.25 C-0.63 5.25 -4.26 5.25 -8 5.25 C-8 3.93 -8 2.61 -8 1.25 C-5.09458095 0.28152698 -3.03362546 0.05417188 0 0 Z " fill="#167DDB" transform="translate(152,103.75)"/>
                        <path d="M0 0 C0.99 0 1.98 0 3 0 C5.1519437 3.22791555 5.20086443 4.28400809 5 8 C5.66 8.33 6.32 8.66 7 9 C6.88058377 13.65915291 6.7562764 18.31814204 6.62768555 22.97705078 C6.58471615 24.55774507 6.54301955 26.13847455 6.50268555 27.71923828 C6.12763714 42.36001679 6.12763714 42.36001679 5.65234375 48.9140625 C5.59941162 49.64834473 5.54647949 50.38262695 5.49194336 51.13916016 C4.87545592 53.47110421 3.72959707 54.37111901 2 56 C1.9845388 55.05825676 1.9845388 55.05825676 1.96876526 54.0974884 C1.86054055 47.55992556 1.74595561 41.02249609 1.62768555 34.48510742 C1.58438791 32.0456827 1.54270917 29.60622868 1.50268555 27.16674805 C1.44485792 23.65925266 1.38119915 20.15190403 1.31640625 16.64453125 C1.29969376 15.55477493 1.28298126 14.46501862 1.26576233 13.34223938 C1.24581711 12.32155869 1.22587189 11.30087799 1.20532227 10.24926758 C1.18977798 9.35436111 1.1742337 8.45945465 1.15821838 7.53742981 C0.9967245 4.94746909 0.56736995 2.5294851 0 0 Z " fill="#0E77D6" transform="translate(129,64)"/>
                        <path d="M0 0 C0.33 0 0.66 0 1 0 C1.33 16.83 1.66 33.66 2 51 C0.68 50.67 -0.64 50.34 -2 50 C-3.68348841 44.87633962 -4.2468852 40.57764115 -4.1875 35.125 C-4.18105469 33.80757812 -4.17460938 32.49015625 -4.16796875 31.1328125 C-4 28 -4 28 -3 27 C-2.84235595 25.22130274 -2.74899323 23.43681524 -2.68359375 21.65234375 C-2.64169922 20.57275391 -2.59980469 19.49316406 -2.55664062 18.38085938 C-2.51732422 17.24455078 -2.47800781 16.10824219 -2.4375 14.9375 C-2.39431641 13.79732422 -2.35113281 12.65714844 -2.30664062 11.48242188 C-2.20017161 8.65507805 -2.09815793 5.82764262 -2 3 C-1.34 3 -0.68 3 0 3 C0 2.01 0 1.02 0 0 Z " fill="#1686EA" transform="translate(93,69)"/>
                        <path d="M0 0 C0.33 0 0.66 0 1 0 C1.75131468 12.43161732 2.25646855 24.5899568 1 37 C0.34 37 -0.32 37 -1 37 C-0.979375 37.804375 -0.95875 38.60875 -0.9375 39.4375 C-1 42 -1 42 -2 43 C-2.12375 44.60875 -2.12375 44.60875 -2.25 46.25 C-3.14414073 50.72070366 -4.67912061 52.01120855 -8 55 C-8.33 55.99 -8.66 56.98 -9 58 C-9.66 58 -10.32 58 -11 58 C-11.103125 58.53625 -11.20625 59.0725 -11.3125 59.625 C-12.18092697 62.62502044 -13.55620296 65.2379535 -15 68 C-15.66 68 -16.32 68 -17 68 C-17.33 69.65 -17.66 71.3 -18 73 C-20.475 73.495 -20.475 73.495 -23 74 C-22.63648438 73.46632813 -22.27296875 72.93265625 -21.8984375 72.3828125 C-20.24627311 69.93422014 -18.61967978 67.47019655 -17 65 C-16.49726563 64.24203125 -15.99453125 63.4840625 -15.4765625 62.703125 C-3.14952686 43.26684658 -0.32782083 22.56311647 0 0 Z " fill="#DDDFE2" transform="translate(215,104)"/>
                        <path d="M0 0 C0.66 0.33 1.32 0.66 2 1 C3.14289156 6.47006588 3.12083769 11.86849475 3.0625 17.4375 C3.05798828 18.26443359 3.05347656 19.09136719 3.04882812 19.94335938 C3.03715811 21.96227146 3.01922718 23.98114574 3 26 C-0.63 26 -4.26 26 -8 26 C-7.01 25.34 -6.02 24.68 -5 24 C-4.61605333 21.22737745 -4.39657752 18.65676472 -4.3125 15.875 C-4.27833984 15.12089844 -4.24417969 14.36679688 -4.20898438 13.58984375 C-4.12645722 11.72708799 -4.06155289 9.86356674 -4 8 C-3.01 7.67 -2.02 7.34 -1 7 C-1.33 6.34 -1.66 5.68 -2 5 C-1.0625 2.375 -1.0625 2.375 0 0 Z " fill="#FBFDFC" transform="translate(115,144)"/>
                        <path d="M0 0 C0.33 0.66 0.66 1.32 1 2 C1.66 2.33 2.32 2.66 3 3 C2.67 5.64 2.34 8.28 2 11 C0.35 10.67 -1.3 10.34 -3 10 C-3.33 11.98 -3.66 13.96 -4 16 C-4.66 16 -5.32 16 -6 16 C-5.79375 16.928125 -5.5875 17.85625 -5.375 18.8125 C-5 22 -5 22 -7 25 C-7.99 25 -8.98 25 -10 25 C-10.33 25.99 -10.66 26.98 -11 28 C-11.66 28 -12.32 28 -13 28 C-12.67 29.32 -12.34 30.64 -12 32 C-13.485 32.495 -13.485 32.495 -15 33 C-14.52992869 26.88907303 -13.16734545 22.45615635 -10.3125 17.0625 C-9.95671875 16.37027344 -9.6009375 15.67804688 -9.234375 14.96484375 C-6.50321784 9.73746769 -3.49079967 4.76018137 0 0 Z " fill="#2B98F7" transform="translate(28,53)"/>
                        <path d="M0 0 C1.125 3.75 1.125 3.75 0 6 C-1.66666667 6.33333333 -3.33333333 6.66666667 -5 7 C-5.33 7.66 -5.66 8.32 -6 9 C-7.75631823 9.94394954 -9.55590347 10.8085551 -11.375 11.625 C-12.35210937 12.07101563 -13.32921875 12.51703125 -14.3359375 12.9765625 C-17 14 -17 14 -20 14 C-20 14.66 -20 15.32 -20 16 C-22.41559068 16.36354039 -24.83194297 16.71610551 -27.25 17.0625 C-27.93191406 17.16626953 -28.61382812 17.27003906 -29.31640625 17.37695312 C-32.7849925 17.86524925 -35.66911113 18.22762141 -39 17 C-37.9584375 16.731875 -36.916875 16.46375 -35.84375 16.1875 C-22.85481984 12.69253572 -11.09518697 7.65244078 0 0 Z " fill="#B7C2CC" transform="translate(172,196)"/>
                        <path d="M0 0 C2.97 0 5.94 0 9 0 C8.67 0.66 8.34 1.32 8 2 C8.99 1.67 9.98 1.34 11 1 C13.33299825 0.96045766 15.66708189 0.95598268 18 1 C18 1.33 18 1.66 18 2 C16.00127261 2.48444764 14.00094063 2.9622766 12 3.4375 C10.88625 3.70433594 9.7725 3.97117188 8.625 4.24609375 C-6.01972212 7.29181721 -20.57780206 6.89538465 -35 3 C-35 2.67 -35 2.34 -35 2 C-34.35313232 2.0714624 -33.70626465 2.1429248 -33.03979492 2.21655273 C-25.77552643 2.95582813 -18.6101067 3.12059485 -11.3125 3.0625 C-10.21744141 3.05798828 -9.12238281 3.05347656 -7.99414062 3.04882812 C-5.32936691 3.03719156 -2.66471483 3.02084564 0 3 C0 2.01 0 1.02 0 0 Z " fill="#2581D4" transform="translate(123,210)"/>
                        <path d="M0 0 C0.66 0 1.32 0 2 0 C1.67 2.64 1.34 5.28 1 8 C0.01 7.67 -0.98 7.34 -2 7 C-1.67 7.99 -1.34 8.98 -1 10 C-1.99 10 -2.98 10 -4 10 C-4.268125 10.763125 -4.53625 11.52625 -4.8125 12.3125 C-6.33082058 15.74869921 -7.96855966 17.3123731 -11.0625 19.375 C-13.22958858 20.87709384 -13.22958858 20.87709384 -13.6875 23.5625 C-15 26 -15 26 -17.12109375 26.765625 C-19.40950981 27.26543506 -21.67999422 27.68016381 -24 28 C-23.278125 27.46375 -22.55625 26.9275 -21.8125 26.375 C-18.16727452 23.2968096 -14.95722135 20.08336411 -12.9375 15.6875 C-12 14 -12 14 -9.875 13.25 C-8.946875 13.12625 -8.946875 13.12625 -8 13 C-7.773125 11.88625 -7.54625 10.7725 -7.3125 9.625 C-6.879375 8.42875 -6.44625 7.2325 -6 6 C-3.4375 4.8125 -3.4375 4.8125 -1 4 C-0.11306697 1.95894361 -0.11306697 1.95894361 0 0 Z " fill="#E8EBEC" transform="translate(198,172)"/>
                        <path d="M0 0 C0.77069824 0.12600586 1.54139648 0.25201172 2.33544922 0.38183594 C5.86463418 1.01461178 8.16721313 1.61147542 11.1875 3.625 C4.7525 4.12 4.7525 4.12 -1.8125 4.625 C-1.8125 3.965 -1.8125 3.305 -1.8125 2.625 C-3.765625 2.65755208 -5.71875 2.69010417 -7.671875 2.72265625 C-9.8125 2.625 -9.8125 2.625 -11.6484375 2.13867188 C-13.99475634 1.58173879 -16.1699821 1.41665144 -18.578125 1.30859375 C-19.46757813 1.26669922 -20.35703125 1.22480469 -21.2734375 1.18164062 C-22.19382812 1.14232422 -23.11421875 1.10300781 -24.0625 1.0625 C-24.99835938 1.01931641 -25.93421875 0.97613281 -26.8984375 0.93164062 C-29.20298641 0.8258195 -31.50763839 0.72373443 -33.8125 0.625 C-33.8125 0.295 -33.8125 -0.035 -33.8125 -0.375 C-22.51094936 -2.25859177 -11.25754563 -1.85386246 0 0 Z " fill="#4CA5F5" transform="translate(129.8125,10.375)"/>
                        <path d="M0 0 C0.33 0 0.66 0 1 0 C1 2.31 1 4.62 1 7 C-1.31 7.33 -3.62 7.66 -6 8 C-6.33 10.31 -6.66 12.62 -7 15 C-12.61 15 -18.22 15 -24 15 C-24 14.34 -24 13.68 -24 13 C-23.09378906 12.72027344 -22.18757813 12.44054687 -21.25390625 12.15234375 C-12.90536513 9.40483445 -6.33450826 6.33450826 0 0 Z " fill="#1B6FBD" transform="translate(143,137)"/>
                        <path d="M0 0 C1.2375 0.67095703 1.2375 0.67095703 2.5 1.35546875 C10.36918234 5.47449388 18.06959056 8.50408932 26.6015625 10.95703125 C30 12 30 12 34 14 C28.06 14.495 28.06 14.495 22 15 C22 14.34 22 13.68 22 13 C19.03 12.505 19.03 12.505 16 12 C16 11.34 16 10.68 16 10 C14.80375 9.731875 13.6075 9.46375 12.375 9.1875 C8.62144624 8.25912994 5.39911194 6.86951157 2 5 C2 4.01 2 3.02 2 2 C1.34 2 0.68 2 0 2 C0 1.34 0 0.68 0 0 Z " fill="#C4C7C9" transform="translate(58,200)"/>
                        <path d="M0 0 C1.299375 -0.03867188 1.299375 -0.03867188 2.625 -0.078125 C5 0.25 5 0.25 6.80078125 1.56640625 C8.58681517 4.07383498 8.19917578 6.26236324 8 9.25 C7.01 8.92 6.02 8.59 5 8.25 C4.67 9.9 4.34 11.55 4 13.25 C3.67 13.25 3.34 13.25 3 13.25 C3 10.61 3 7.97 3 5.25 C-0.63 5.25 -4.26 5.25 -8 5.25 C-8 3.93 -8 2.61 -8 1.25 C-5.09458095 0.28152698 -3.03362546 0.05417188 0 0 Z " fill="#117EE0" transform="translate(152,103.75)"/>
                        <path d="M0 0 C0 1.65 0 3.3 0 5 C-1.98 5.33 -3.96 5.66 -6 6 C-6.33 7.65 -6.66 9.3 -7 11 C-9.31 11.66 -11.62 12.32 -14 13 C-14.33 12.01 -14.66 11.02 -15 10 C-15.66 9.67 -16.32 9.34 -17 9 C-3.89320388 0 -3.89320388 0 0 0 Z " fill="#2894F9" transform="translate(70,19)"/>
                        <path d="M0 0 C0.66 0 1.32 0 2 0 C1.67515625 1.3921875 1.67515625 1.3921875 1.34375 2.8125 C-1.91482113 18.39865424 -1.28424911 34.16659553 -1 50 C-1.99 50.495 -1.99 50.495 -3 51 C-3.19224417 44.93139109 -3.37097055 38.86259269 -3.53710938 32.79321289 C-3.59555421 30.72799981 -3.65770985 28.6628883 -3.72363281 26.59790039 C-3.81767969 23.63186129 -3.89843105 20.66571442 -3.9765625 17.69921875 C-4.00875885 16.7741301 -4.0409552 15.84904144 -4.0741272 14.8959198 C-4.09429901 14.03525406 -4.11447083 13.17458832 -4.13525391 12.2878418 C-4.15746002 11.53061325 -4.17966614 10.7733847 -4.20254517 9.99320984 C-4 8 -4 8 -2 5 C-1.67 5 -1.34 5 -1 5 C-0.67 3.35 -0.34 1.7 0 0 Z " fill="#C6D8E9" transform="translate(12,82)"/>
                        <path d="M0 0 C4.17576168 0.68416434 7.88080407 2.01365009 11.8125 3.5625 C13.55466797 4.24505859 13.55466797 4.24505859 15.33203125 4.94140625 C16.21246094 5.29074219 17.09289062 5.64007813 18 6 C18 6.66 18 7.32 18 8 C20.97 8.495 20.97 8.495 24 9 C24 9.66 24 10.32 24 11 C25.98567708 11.1953125 27.97135417 11.390625 29.95703125 11.5859375 C32 12 32 12 35 14 C31.4280275 14.08118119 28.44112731 13.87312185 25 13 C23.41974995 12.78807905 21.83601539 12.60076629 20.25 12.4375 C19.45078125 12.35371094 18.6515625 12.26992187 17.828125 12.18359375 C17.22484375 12.12300781 16.6215625 12.06242188 16 12 C15.67 10.02 15.34 8.04 15 6 C13.7315625 6.0928125 13.7315625 6.0928125 12.4375 6.1875 C7.64394383 5.9260333 4.27895302 4.13947651 0 2 C0 1.34 0 0.68 0 0 Z " fill="#E5E7E8" transform="translate(56,204)"/>
                        <path d="M0 0 C0.33 0 0.66 0 1 0 C1 1.98 1 3.96 1 6 C0.34 6 -0.32 6 -1 6 C-0.67 13.92 -0.34 21.84 0 30 C0.33 30 0.66 30 1 30 C1.28571429 37.42857143 1.28571429 37.42857143 -1 41 C-1.12375 40.195625 -1.2475 39.39125 -1.375 38.5625 C-1.58125 37.716875 -1.7875 36.87125 -2 36 C-2.66 35.67 -3.32 35.34 -4 35 C-3.9285376 34.42459473 -3.8570752 33.84918945 -3.78344727 33.25634766 C-2.99262352 26.2763784 -2.88206335 19.39413308 -2.9375 12.375 C-2.94201172 11.27542969 -2.94652344 10.17585938 -2.95117188 9.04296875 C-2.96282861 6.36191997 -2.97918983 3.68099068 -3 1 C-2.34 1.66 -1.68 2.32 -1 3 C-0.67 2.01 -0.34 1.02 0 0 Z " fill="#0E8DFD" transform="translate(213,95)"/>
                        <path d="M0 0 C1.1484375 1.640625 1.1484375 1.640625 2 4 C1.1015625 6.796875 1.1015625 6.796875 -0.375 9.75 C-1.09816406 11.22726563 -1.09816406 11.22726563 -1.8359375 12.734375 C-2.41214844 13.85585937 -2.41214844 13.85585937 -3 15 C-3.66 15 -4.32 15 -5 15 C-5.1546875 15.804375 -5.1546875 15.804375 -5.3125 16.625 C-6.18092697 19.62502044 -7.55620296 22.2379535 -9 25 C-9.66 25 -10.32 25 -11 25 C-11.33 26.65 -11.66 28.3 -12 30 C-13.65 30.33 -15.3 30.66 -17 31 C-16.45472656 30.19949219 -16.45472656 30.19949219 -15.8984375 29.3828125 C-9.50506623 19.90750842 -4.14991426 10.68694733 0 0 Z " fill="#C7CED4" transform="translate(209,147)"/>
                        <path d="M0 0 C0.33 0 0.66 0 1 0 C1.33 10.56 1.66 21.12 2 32 C2.33 32 2.66 32 3 32 C3.07347656 32.92619141 3.07347656 32.92619141 3.1484375 33.87109375 C3.61163762 39.11803306 4.36586435 44.08824683 5.6953125 49.1875 C6 51 6 51 5 53 C2.22957891 50.22957891 2.60203894 48.23466195 2.375 44.375 C2.30023438 43.18648437 2.22546875 41.99796875 2.1484375 40.7734375 C2.09945313 39.85820312 2.05046875 38.94296875 2 38 C1.34 38 0.68 38 0 38 C0 25.46 0 12.92 0 0 Z " fill="#E9E7E7" transform="translate(8,100)"/>
                        <path d="M0 0 C1.4800841 0.11362262 2.95910074 0.24122908 4.4375 0.375 C5.26121094 0.44460937 6.08492187 0.51421875 6.93359375 0.5859375 C7.95646484 0.79089844 7.95646484 0.79089844 9 1 C9.33 1.66 9.66 2.32 10 3 C11.27875 3.103125 12.5575 3.20625 13.875 3.3125 C16.05859375 3.5234375 16.05859375 3.5234375 18 4 C19.9375 6.4375 19.9375 6.4375 21 9 C21.33 9.66 21.66 10.32 22 11 C13.8588535 10.18588535 6.56739663 5.69848323 0 1 C0 0.67 0 0.34 0 0 Z " fill="#198AED" transform="translate(54,197)"/>
                        <path d="M0 0 C2.14576637 -0.02685938 4.29162645 -0.04633088 6.4375 -0.0625 C7.63246094 -0.07410156 8.82742187 -0.08570313 10.05859375 -0.09765625 C13 0 13 0 14 1 C16.65656878 1.10183014 19.28101425 1.14072051 21.9375 1.125 C22.70570068 1.12306641 23.47390137 1.12113281 24.26538086 1.11914062 C29.89950682 1.07646234 35.40669462 0.710261 41 0 C38.81543676 2.64718048 37.64504168 3.88780413 34.20678711 4.48583984 C33.1575708 4.47762207 32.10835449 4.4694043 31.02734375 4.4609375 C29.88072266 4.45707031 28.73410156 4.45320312 27.55273438 4.44921875 C25.76319336 4.41248047 25.76319336 4.41248047 23.9375 4.375 C22.74060547 4.37371094 21.54371094 4.37242187 20.31054688 4.37109375 C11.42158036 4.28105357 11.42158036 4.28105357 8 2 C5.9507906 1.54860541 5.9507906 1.54860541 3.8125 1.375 C1.9253125 1.189375 1.9253125 1.189375 0 1 C0 0.67 0 0.34 0 0 Z " fill="#E8E8E8" transform="translate(91,218)"/>
                        <path d="M0 0 C0.66 0 1.32 0 2 0 C1.84660156 1.0621875 1.69320312 2.124375 1.53515625 3.21875 C0.81737857 8.96097142 0.6483373 14.72098415 0.4375 20.5 C0.39431641 21.60859375 0.35113281 22.7171875 0.30664062 23.859375 C0.20137786 26.57281506 0.09924154 29.28633417 0 32 C-0.99 32.495 -0.99 32.495 -2 33 C-2.33 24.42 -2.66 15.84 -3 7 C-2.34 6.67 -1.68 6.34 -1 6 C-0.34227572 2.97065509 -0.34227572 2.97065509 0 0 Z " fill="#258DEB" transform="translate(91,64)"/>
                        <path d="M0 0 C0.66 0.99 1.32 1.98 2 3 C7.14229954 4.33763866 12.5840277 4.31946588 17.875 4.5625 C18.75414063 4.60568359 19.63328125 4.64886719 20.5390625 4.69335938 C22.69255797 4.79869339 24.84626064 4.89977649 27 5 C27 5.33 27 5.66 27 6 C1.0298471 6.61916858 1.0298471 6.61916858 -10 3 C-6.98409514 -0.01590486 -4.13765554 -0.42437493 0 0 Z " fill="#0E8DFB" transform="translate(96,208)"/>
                        <path d="M0 0 C0.99 0 1.98 0 3 0 C5.12526037 3.18789056 5.23682404 3.84538171 5.13525391 7.47143555 C5.11508209 8.37214279 5.09491028 9.27285004 5.0741272 10.20085144 C5.02583267 11.65410576 5.02583267 11.65410576 4.9765625 13.13671875 C4.95153656 14.13129593 4.92651062 15.12587311 4.90072632 16.15058899 C4.81849847 19.32990458 4.7219191 22.5086016 4.625 25.6875 C4.56676333 27.84177154 4.50945999 29.99606852 4.453125 32.15039062 C4.31291565 37.43393686 4.16091863 42.71704615 4 48 C3.67 48 3.34 48 3 48 C2.98018066 46.75911621 2.96036133 45.51823242 2.93994141 44.23974609 C2.86367919 39.62138099 2.7749937 35.00332248 2.68261719 30.38525391 C2.64441252 28.38922188 2.60954498 26.39312301 2.578125 24.39697266 C2.53228936 21.52221846 2.47432559 18.64792108 2.4140625 15.7734375 C2.39673569 14.44184097 2.39673569 14.44184097 2.37905884 13.08334351 C2.26705038 8.34577734 1.81584956 4.45360998 0 0 Z " fill="#2279C6" transform="translate(129,64)"/>
                        <path d="M0 0 C2.0625 0.4375 2.0625 0.4375 4 1 C3.01 1.33 2.02 1.66 1 2 C0.67 9.59 0.34 17.18 0 25 C-2.97 25 -5.94 25 -9 25 C-9.66 23.68 -10.32 22.36 -11 21 C-8.03 21 -5.06 21 -2 21 C-1.93941406 19.56785156 -1.87882812 18.13570312 -1.81640625 16.66015625 C-1.73201896 14.79425959 -1.64737007 12.92837476 -1.5625 11.0625 C-1.52318359 10.11697266 -1.48386719 9.17144531 -1.44335938 8.19726562 C-1.40146484 7.29814453 -1.35957031 6.39902344 -1.31640625 5.47265625 C-1.27974854 4.64000244 -1.24309082 3.80734863 -1.20532227 2.94946289 C-1 1 -1 1 0 0 Z " fill="#0E75D6" transform="translate(120,151)"/>
                        <path d="M0 0 C0.99 0 1.98 0 3 0 C3.12375 0.556875 3.2475 1.11375 3.375 1.6875 C3.92476438 4.02515957 3.92476438 4.02515957 5.0625 6.125 C6.4524642 10.38755687 6.15539143 14.55407858 6 19 C5.34 19 4.68 19 4 19 C3.13499112 16.39898714 2.28273072 13.79493589 1.4375 11.1875 C1.19064453 10.44951172 0.94378906 9.71152344 0.68945312 8.95117188 C-1.11328125 3.33984375 -1.11328125 3.33984375 0 0 Z " fill="#EAEBED" transform="translate(209,72)"/>
                        <path d="M0 0 C2.0625 0.4375 2.0625 0.4375 4 1 C-0.58547704 6.40431223 -6.63500118 9.97262981 -13 13 C-13.66 12.67 -14.32 12.34 -15 12 C-14.67 11.01 -14.34 10.02 -14 9 C-12.02 9 -10.04 9 -8 9 C-7.67 8.01 -7.34 7.02 -7 6 C-6.34 5.67 -5.68 5.34 -5 5 C-3.86649466 2.98330173 -3.86649466 2.98330173 -3 1 C-2.34 1 -1.68 1 -1 1 C-0.67 0.67 -0.34 0.34 0 0 Z " fill="#177DD6" transform="translate(172,192)"/>
                        <path d="M0 0 C1.32 0 2.64 0 4 0 C5.11502133 1.11502133 6.21528603 2.24757894 7.25 3.4375 C9.58660302 5.52375269 12.17517717 6.68174935 15 8 C15 8.99 15 9.98 15 11 C15.99 11.33 16.98 11.66 18 12 C15.50907189 13.24546405 14.58919267 12.7767578 12 12 C12 11.01 12 10.02 12 9 C9.03 8.505 9.03 8.505 6 8 C5.67 6.68 5.34 5.36 5 4 C4.360625 3.896875 3.72125 3.79375 3.0625 3.6875 C2.381875 3.460625 1.70125 3.23375 1 3 C0.67 2.01 0.34 1.02 0 0 Z " fill="#E2E4E5" transform="translate(39,191)"/>
                        <path d="M0 0 C0.66 0 1.32 0 2 0 C2.32613281 0.66386719 2.65226562 1.32773438 2.98828125 2.01171875 C5.18009471 6.44060436 7.35262752 10.81993819 10 15 C7.69 14.67 5.38 14.34 3 14 C2.67 11.36 2.34 8.72 2 6 C1.01 6 0.02 6 -1 6 C-0.67 4.02 -0.34 2.04 0 0 Z " fill="#1D7FD7" transform="translate(70,121)"/>
                        <path d="M0 0 C1.65 0 3.3 0 5 0 C6.04761905 5.23809524 6.04761905 5.23809524 6 8 C4.1875 10.375 4.1875 10.375 2 12 C1.34 12.66 0.68 13.32 0 14 C0.185625 13.05125 0.37125 12.1025 0.5625 11.125 C1.28686632 8.10131207 1.28686632 8.10131207 0 6 C-0.039992 4.00039988 -0.04346799 1.99952758 0 0 Z " fill="#1380E0" transform="translate(136,112)"/>
                        <path d="M0 0 C0.99 0 1.98 0 3 0 C2.01 3.3 1.02 6.6 0 10 C-0.66 10 -1.32 10 -2 10 C-2 11.65 -2 13.3 -2 15 C-2.99 15.495 -2.99 15.495 -4 16 C-4.33 13.36 -4.66 10.72 -5 8 C-4.34 8 -3.68 8 -3 8 C-2.67 6.02 -2.34 4.04 -2 2 C-1.34 2 -0.68 2 0 2 C0 1.34 0 0.68 0 0 Z " fill="#F3F1F1" transform="translate(14,72)"/>
                        <path d="M0 0 C1 2 1 2 0.3125 4.5625 C-0.3371875 5.7690625 -0.3371875 5.7690625 -1 7 C-2.33076989 7.34342449 -3.66431979 7.67619874 -5 8 C-5.45375 8.78375 -5.9075 9.5675 -6.375 10.375 C-8.43739274 13.70655751 -10.40157813 14.57562468 -14 16 C-14.99 16 -15.98 16 -17 16 C-16.10796875 15.18015625 -15.2159375 14.3603125 -14.296875 13.515625 C-13.11454214 12.42712808 -11.93225277 11.33858392 -10.75 10.25 C-9.87021484 9.44175781 -9.87021484 9.44175781 -8.97265625 8.6171875 C-5.91843019 5.80318147 -2.90859255 2.96618844 0 0 Z " fill="#BCC7D1" transform="translate(191,179)"/>
                        <path d="M0 0 C0.33 0 0.66 0 1 0 C1.33 2.31 1.66 4.62 2 7 C1.01 7.33 0.02 7.66 -1 8 C-1.80212628 9.87387216 -1.80212628 9.87387216 -2.1875 12.0625 C-2.34605469 12.79597656 -2.50460938 13.52945313 -2.66796875 14.28515625 C-2.77753906 14.85105469 -2.88710937 15.41695312 -3 16 C-6.75 17.125 -6.75 17.125 -9 16 C-8.2575 15.030625 -7.515 14.06125 -6.75 13.0625 C-3.81725271 8.98506218 -1.88231629 4.63743847 0 0 Z " fill="#1B74C5" transform="translate(154,119)"/>
                        <path d="M0 0 C1.125 3.75 1.125 3.75 0 6 C-1.66666667 6.33333333 -3.33333333 6.66666667 -5 7 C-5.33 7.66 -5.66 8.32 -6 9 C-8.9375 10.6875 -8.9375 10.6875 -12 12 C-12.66 11.67 -13.32 11.34 -14 11 C-9.85989729 6.45924219 -5.17609824 3.28157862 0 0 Z " fill="#C1CAD0" transform="translate(172,196)"/>
                        <path d="M0 0 C-2.64 0 -5.28 0 -8 0 C-8 0.66 -8 1.32 -8 2 C-15.38461538 3.35384615 -15.38461538 3.35384615 -18.5 1.5625 C-18.995 1.046875 -19.49 0.53125 -20 0 C-6 -4 -6 -4 0 0 Z " fill="#3E9AF3" transform="translate(104,13)"/>
                        <path d="M0 0 C3.96 0 7.92 0 12 0 C12 0.99 12 1.98 12 3 C14.64 3 17.28 3 20 3 C20 3.33 20 3.66 20 4 C6.3667426 4.3690205 6.3667426 4.3690205 0 2 C0 1.34 0 0.68 0 0 Z " fill="#D1D2D4" transform="translate(84,214)"/>
                        <path d="M0 0 C3.71599191 -0.20086443 4.77208445 -0.1519437 8 2 C8 2.99 8 3.98 8 5 C8.99 5 9.98 5 11 5 C11 5.66 11 6.32 11 7 C6.545 7.495 6.545 7.495 2 8 C2.66 6.68 3.32 5.36 4 4 C3.01 3.67 2.02 3.34 1 3 C0.67 2.01 0.34 1.02 0 0 Z " fill="#1D88EB" transform="translate(104,132)"/>
                        <path d="M0 0 C4.95 0 9.9 0 15 0 C14.67 0.99 14.34 1.98 14 3 C12.23397681 3.41676948 10.46185699 3.8077738 8.6875 4.1875 C7.70136719 4.40792969 6.71523437 4.62835938 5.69921875 4.85546875 C3 5 3 5 1.14453125 3.67578125 C0 2 0 2 0 0 Z " fill="#1473C9" transform="translate(106,128)"/>
                        <path d="M0 0 C0.33 0 0.66 0 1 0 C1.22951631 3.45725945 1.4296071 6.9156576 1.625 10.375 C1.68945312 11.34050781 1.75390625 12.30601563 1.8203125 13.30078125 C2.17190847 19.84925615 1.61086075 25.64207398 0 32 C-0.66 32 -1.32 32 -2 32 C-1.84660156 30.9378125 -1.69320312 29.875625 -1.53515625 28.78125 C-0.81737857 23.03902858 -0.6483373 17.27901585 -0.4375 11.5 C-0.39431641 10.39140625 -0.35113281 9.2828125 -0.30664062 8.140625 C-0.20137786 5.42718494 -0.09924154 2.71366583 0 0 Z " fill="#B3C8DF" transform="translate(215,104)"/>
                        <path d="M0 0 C1.75 0.8125 1.75 0.8125 2.75 2.8125 C3.74 3.4725 4.73 4.1325 5.75 4.8125 C1.27745503 6.30334832 -2.77745503 6.30334832 -7.25 4.8125 C-7.25 4.1525 -7.25 3.4925 -7.25 2.8125 C-3.15 -0.2625 -3.15 -0.2625 0 0 Z M2.75 1.8125 C4.75 2.8125 4.75 2.8125 4.75 2.8125 Z " fill="#E5EFF4" transform="translate(113.25,122.1875)"/>
                        <path d="M0 0 C0.71285156 0.33773437 1.42570312 0.67546875 2.16015625 1.0234375 C7.38656437 3.45726954 12.39584643 5.6300958 18 7 C17.67 7.66 17.34 8.32 17 9 C13.94768215 9.2934921 11.04245039 9.43764884 8 9 C5.6875 6.625 5.6875 6.625 4 4 C1.88339573 2.68834743 1.88339573 2.68834743 0 2 C0 1.34 0 0.68 0 0 Z " fill="#1C69B0" transform="translate(88,143)"/>
                        <path d="M0 0 C1.66066101 3.06861273 2.70177275 6.07564723 3.625 9.4375 C3.88539062 10.36433594 4.14578125 11.29117188 4.4140625 12.24609375 C4.98381204 14.92391659 5.10889863 17.27258425 5 20 C4.01 19.67 3.02 19.34 2 19 C-0.51858302 13.08739067 -0.23666802 6.29799892 0 0 Z " fill="#C6D0D7" transform="translate(11,132)"/>
                        <path d="M0 0 C0.33 0 0.66 0 1 0 C1.12375 0.969375 1.2475 1.93875 1.375 2.9375 C1.58125 3.948125 1.7875 4.95875 2 6 C2.66 6.33 3.32 6.66 4 7 C3.360625 7.103125 2.72125 7.20625 2.0625 7.3125 C1.381875 7.539375 0.70125 7.76625 0 8 C-0.33 8.99 -0.66 9.98 -1 11 C-1.66 11 -2.32 11 -3 11 C-2.67 12.32 -2.34 13.64 -2 15 C-2.99 15.33 -3.98 15.66 -5 16 C-4.55643705 9.79011871 -3.08467498 5.39459439 0 0 Z " fill="#419EF3" transform="translate(18,70)"/>
                        <path d="M0 0 C1.9375 0.3125 1.9375 0.3125 4 1 C4.33 1.99 4.66 2.98 5 4 C5.66 4 6.32 4 7 4 C7 7.3 7 10.6 7 14 C4.89284903 11.19046537 3.33410537 8.94153036 1.8125 5.875 C1.29623047 4.85019531 1.29623047 4.85019531 0.76953125 3.8046875 C0 2 0 2 0 0 Z " fill="#EEEFF0" transform="translate(200,56)"/>
                        <path d="M0 0 C0.66 0 1.32 0 2 0 C2.66 4.29 3.32 8.58 4 13 C2.68 13.33 1.36 13.66 0 14 C0 9.38 0 4.76 0 0 Z " fill="#F1F7F6" transform="translate(8,138)"/>
                        <path d="M0 0 C7.38461538 -0.36923077 7.38461538 -0.36923077 10.5 1.5 C10.995 1.995 11.49 2.49 12 3 C8.77208445 5.1519437 7.71599191 5.20086443 4 5 C3.67 4.01 3.34 3.02 3 2 C2.01 2 1.02 2 0 2 C0 1.34 0 0.68 0 0 Z " fill="#F6F8F7" transform="translate(112,121)"/>
                        <path d="M0 0 C5.35048061 0.37328935 7.50912907 1.9957657 11 6 C10.01 6 9.02 6 8 6 C8 5.34 8 4.68 8 4 C5.69 4 3.38 4 1 4 C0.67 4.99 0.34 5.98 0 7 C-0.66 6.34 -1.32 5.68 -2 5 C-1.34 3.35 -0.68 1.7 0 0 Z " fill="#2894F7" transform="translate(162,24)"/>
                        <path d="M0 0 C0.66 0.33 1.32 0.66 2 1 C2.125 6.75 2.125 6.75 1 9 C1.66 9 2.32 9 3 9 C3 9.66 3 10.32 3 11 C-0.69790046 9.76736651 -0.9354846 8.79947549 -2.6875 5.4375 C-3.12449219 4.61121094 -3.56148437 3.78492188 -4.01171875 2.93359375 C-4.33785156 2.29550781 -4.66398437 1.65742188 -5 1 C-4.01 1.33 -3.02 1.66 -2 2 C-2 2.66 -2 3.32 -2 4 C-1.34 4 -0.68 4 0 4 C0 2.68 0 1.36 0 0 Z " fill="#1E87E4" transform="translate(29,164)"/>
                        <path d="M0 0 C2.67927341 4.01891012 2.15601248 6.24161923 2 11 C1.34 11 0.68 11 0 11 C0 7.37 0 3.74 0 0 Z M-8 7 C-7.01 7.33 -6.02 7.66 -5 8 C-5 8.66 -5 9.32 -5 10 C-3.68 10.66 -2.36 11.32 -1 12 C-2.98 12.99 -2.98 12.99 -5 14 C-8 9.25 -8 9.25 -8 7 Z " fill="#E0EEF8" transform="translate(81,117)"/>
                        <path d="M0 0 C0 0.33 0 0.66 0 1 C-7.97490128 2.32915021 -15.94186719 2.08801359 -24 2 C-24 1.67 -24 1.34 -24 1 C-15.72913843 -0.59105604 -8.35268278 -1.2386744 0 0 Z " fill="#D1D1D1" transform="translate(128,217)"/>
                        <path d="M0 0 C0.66 0.33 1.32 0.66 2 1 C0.5 3 0.5 3 -2 5 C-4.75871627 5.35800135 -7.20097524 5.18660165 -10 5 C-9.67 4.01 -9.34 3.02 -9 2 C-6.94921875 1.77213542 -4.8984375 1.54427083 -2.84765625 1.31640625 C-0.98859771 1.18113386 -0.98859771 1.18113386 0 0 Z " fill="#E8E9EB" transform="translate(154,211)"/>
                        <path d="M0 0 C0.91058531 3.07322544 1.08886184 5.80097361 1 9 C-0.65 9.66 -2.3 10.32 -4 11 C-4 7 -4 7 -3 4 C-2.34 4 -1.68 4 -1 4 C-0.67 2.68 -0.34 1.36 0 0 Z " fill="#E9E7E6" transform="translate(207,158)"/>
                        <path d="M0 0 C0.66 0 1.32 0 2 0 C1.67 2.64 1.34 5.28 1 8 C0.01 7.67 -0.98 7.34 -2 7 C-2 7.66 -2 8.32 -2 9 C-3.65 9.33 -5.3 9.66 -7 10 C-6.8125 8.125 -6.8125 8.125 -6 6 C-4.33333333 5.33333333 -2.66666667 4.66666667 -1 4 C-0.11306697 1.95894361 -0.11306697 1.95894361 0 0 Z " fill="#E1E2E3" transform="translate(198,172)"/>
                        <path d="M0 0 C0.99 0.33 1.98 0.66 3 1 C0.36 4.63 -2.28 8.26 -5 12 C-5.66 11.34 -6.32 10.68 -7 10 C-6.34 8.68 -5.68 7.36 -5 6 C-4.34 6 -3.68 6 -3 6 C-2.814375 4.7934375 -2.814375 4.7934375 -2.625 3.5625 C-2.41875 2.716875 -2.2125 1.87125 -2 1 C-1.34 0.67 -0.68 0.34 0 0 Z " fill="#E5EBF2" transform="translate(29,48)"/>
                        <path d="M0 0 C0.66 0.66 1.32 1.32 2 2 C1.5625 4.375 1.5625 4.375 0 7 C-2.94119871 8.07001562 -5.90584243 8.57343918 -9 9 C-8.2575 8.443125 -7.515 7.88625 -6.75 7.3125 C-4.08292005 5.06972822 -2.08443768 2.77925025 0 0 Z " fill="#ECEDEE" transform="translate(183,191)"/>
                        <path d="M0 0 C0.33 0.66 0.66 1.32 1 2 C1.66 2 2.32 2 3 2 C3.33 3.32 3.66 4.64 4 6 C4.99 6 5.98 6 7 6 C6.67 7.32 6.34 8.64 6 10 C3.54896452 9.01958581 2.23241214 8.3486182 0.75 6.125 C0 4 0 4 0 0 Z " fill="#ECEDEC" transform="translate(32,182)"/>
                        <path d="M0 0 C-0.33 1.32 -0.66 2.64 -1 4 C-1.66 3.79375 -2.32 3.5875 -3 3.375 C-7.09630108 2.86296237 -10.04235979 3.85966299 -14 5 C-14 4.34 -14 3.68 -14 3 C-12.04486839 2.303447 -10.08577524 1.61800435 -8.125 0.9375 C-7.03445312 0.55464844 -5.94390625 0.17179688 -4.8203125 -0.22265625 C-2 -1 -2 -1 0 0 Z " fill="#1867AC" transform="translate(133,147)"/>
                        <path d="M0 0 C0.66 0 1.32 0 2 0 C3.5078125 1.64453125 3.5078125 1.64453125 5.125 3.8125 C5.66382813 4.52019531 6.20265625 5.22789062 6.7578125 5.95703125 C8 8 8 8 8 11 C7.34 11 6.68 11 6 11 C5.67 9.68 5.34 8.36 5 7 C3.68 6.67 2.36 6.34 1 6 C0.67 4.02 0.34 2.04 0 0 Z " fill="#E0E2E2" transform="translate(24,171)"/>
                        <path d="M0 0 C0.66 0 1.32 0 2 0 C2.33 1.98 2.66 3.96 3 6 C-0.63 6 -4.26 6 -8 6 C-8 5.34 -8 4.68 -8 4 C-3.25 2.875 -3.25 2.875 -1 4 C-0.67 2.68 -0.34 1.36 0 0 Z " fill="#1476D3" transform="translate(133,146)"/>
                        <path d="M0 0 C2.50037734 2.17424117 3.43628586 3.73045798 4 7 C1.69 6.34 -0.62 5.68 -3 5 C-3 4.01 -3 3.02 -3 2 C-2.01 2 -1.02 2 0 2 C0 1.34 0 0.68 0 0 Z " fill="#2695F7" transform="translate(199,57)"/>
                        <path d="M0 0 C0 1.65 0 3.3 0 5 C-3.3 5 -6.6 5 -10 5 C-3.33333333 0 -3.33333333 0 0 0 Z " fill="#3B9DF5" transform="translate(70,19)"/>
                        <path d="M0 0 C0 0.66 0 1.32 0 2 C-0.99 2.33 -1.98 2.66 -3 3 C-3.33 3.66 -3.66 4.32 -4 5 C-4.66 5 -5.32 5 -6 5 C-6 4.34 -6 3.68 -6 3 C-6.99 3.66 -7.98 4.32 -9 5 C-11.6875 5.125 -11.6875 5.125 -14 5 C-9.67612562 1.34133706 -5.65076098 0 0 0 Z " fill="#4BA4F4" transform="translate(84,14)"/>
                        <path d="M0 0 C-1.50223584 4.20626034 -4.28550034 5.73900021 -8 8 C-8.33 6.68 -8.66 5.36 -9 4 C-2.25 0 -2.25 0 0 0 Z " fill="#DBD7D4" transform="translate(182,192)"/>
                        <path d="M0 0 C0.99 0 1.98 0 3 0 C1.68938409 4.23429756 0.05643741 8.07407404 -2 12 C-2.33 12 -2.66 12 -3 12 C-3.34833144 7.12335991 -2.41685712 4.22949995 0 0 Z " fill="#E9EDEF" transform="translate(20,60)"/>
                        <path d="M0 0 C0 0.66 0 1.32 0 2 C0.66 2.66 1.32 3.32 2 4 C-1.3 4.33 -4.6 4.66 -8 5 C-8 3.68 -8 2.36 -8 1 C-5.23735711 0.40267181 -2.83967231 0 0 0 Z " fill="#248FEF" transform="translate(112,51)"/>
                        <path d="M0 0 C3.3 0.33 6.6 0.66 10 1 C10.33 2.65 10.66 4.3 11 6 C7.2089881 4.55049545 3.6125362 2.84827434 0 1 C0 0.67 0 0.34 0 0 Z " fill="#D0E5F9" transform="translate(154,18)"/>
                        <path d="M0 0 C2.97 0.33 5.94 0.66 9 1 C8.67 1.99 8.34 2.98 8 4 C8.99 4.33 9.98 4.66 11 5 C8.45297384 6.27351308 7.5717055 5.80191925 4.875 5.0625 C4.15054688 4.86785156 3.42609375 4.67320313 2.6796875 4.47265625 C2.12539062 4.31667969 1.57109375 4.16070313 1 4 C1.99 3.67 2.98 3.34 4 3 C4 2.34 4 1.68 4 1 C2.68 0.67 1.36 0.34 0 0 Z " fill="#E9F4FC" transform="translate(132,8)"/>
                        <path d="M0 0 C3.69293736 0.6594531 4.70572579 1.52929434 8 4 C2.555 5.485 2.555 5.485 -3 7 C-2.67 6.01 -2.34 5.02 -2 4 C-1.34 4 -0.68 4 0 4 C0 2.68 0 1.36 0 0 Z " fill="#E8F1F8" transform="translate(80,9)"/>
                        <path d="M0 0 C3.63 0 7.26 0 11 0 C11 0.66 11 1.32 11 2 C9.741875 2.185625 8.48375 2.37125 7.1875 2.5625 C6.12595703 2.71912109 6.12595703 2.71912109 5.04296875 2.87890625 C3 3 3 3 0 2 C0 1.34 0 0.68 0 0 Z " fill="#1566B5" transform="translate(107,170)"/>
                        <path d="M0 0 C4.17950077 3.45889719 5.32762134 6.98286401 7 12 C5.0625 11.25 5.0625 11.25 3 10 C2.25 7.875 2.25 7.875 2 6 C1.34 6 0.68 6 0 6 C0 4.02 0 2.04 0 0 Z " fill="#E7E6E4" transform="translate(16,156)"/>
                        <path d="M0 0 C0.8971875 0.5259375 0.8971875 0.5259375 1.8125 1.0625 C-3.4609375 4.28515625 -3.4609375 4.28515625 -5.1875 5.0625 C-5.8475 4.7325 -6.5075 4.4025 -7.1875 4.0625 C-6.375 2.125 -6.375 2.125 -5.1875 0.0625 C-2.1875 -0.9375 -2.1875 -0.9375 0 0 Z " fill="#EDF5F7" transform="translate(55.1875,24.9375)"/>
                        <path d="M0 0 C0.66 0.66 1.32 1.32 2 2 C-2.2837641 4.57025846 -6.1725201 6.58707905 -11 8 C-11 7.01 -11 6.02 -11 5 C-10.37351563 4.72285156 -9.74703125 4.44570312 -9.1015625 4.16015625 C-8.28429687 3.79792969 -7.46703125 3.43570313 -6.625 3.0625 C-5.81289062 2.70285156 -5.00078125 2.34320313 -4.1640625 1.97265625 C-2.76316215 1.3430097 -1.37374716 0.68687358 0 0 Z " fill="#DFE0E1" transform="translate(163,205)"/>
                        <path d="M0 0 C2.78637633 4.1795645 1.79562512 6.14668677 1 11 C0.01 11.33 -0.98 11.66 -2 12 C-2.21278058 7.53160785 -1.59138085 4.17737474 0 0 Z " fill="#EEF4F6" transform="translate(214,141)"/>
                        <path d="M0 0 C0.66 0 1.32 0 2 0 C5 5.75 5 5.75 5 8 C4.01 8 3.02 8 2 8 C1.34 7.01 0.68 6.02 0 5 C-0.66 5 -1.32 5 -2 5 C-2 4.01 -2 3.02 -2 2 C-1.34 2 -0.68 2 0 2 C0 1.34 0 0.68 0 0 Z " fill="#2194F9" transform="translate(203,66)"/>
                        <path d="M0 0 C1.98 0 3.96 0 6 0 C6.66 2.64 7.32 5.28 8 8 C3.79373966 6.49776416 2.26099979 3.71449966 0 0 Z " fill="#E7ECF1" transform="translate(192,47)"/>
                        <path d="M0 0 C1.32 0.66 2.64 1.32 4 2 C1.29730077 4.70269923 -1.4252738 5.70570258 -5 7 C-7.2265625 6.58203125 -7.2265625 6.58203125 -9 6 C-8.43410156 5.73445312 -7.86820313 5.46890625 -7.28515625 5.1953125 C-6.55167969 4.84210938 -5.81820312 4.48890625 -5.0625 4.125 C-4.33160156 3.77695313 -3.60070312 3.42890625 -2.84765625 3.0703125 C-0.83667541 2.1315023 -0.83667541 2.1315023 0 0 Z " fill="#1B79D1" transform="translate(153,203)"/>
                        <path d="M0 0 C2.97 0.33 5.94 0.66 9 1 C9.33 2.65 9.66 4.3 10 6 C6.40992874 4.66654496 3.20429093 3.1056769 0 1 C0 0.67 0 0.34 0 0 Z " fill="#2285E0" transform="translate(54,197)"/>
                        <path d="M0 0 C0.66 0.33 1.32 0.66 2 1 C-1.465 3.97 -1.465 3.97 -5 7 C-5.66 5.35 -6.32 3.7 -7 2 C-4 1 -4 1 -2 1 C-1.34 0.67 -0.68 0.34 0 0 Z " fill="#137DDB" transform="translate(183,185)"/>
                        <path d="M0 0 C5.94 0.66 11.88 1.32 18 2 C18 2.33 18 2.66 18 3 C12.06 3 6.12 3 0 3 C0 2.01 0 1.02 0 0 Z " fill="#E7F3FC" transform="translate(99,138)"/>
                        <path d="M0 0 C3.36720387 1.39332574 4.9859524 2.9789286 7 6 C4.625 6.625 4.625 6.625 2 7 C1.34 6.34 0.68 5.68 0 5 C0.33 4.67 0.66 4.34 1 4 C0.59070014 1.94603274 0.59070014 1.94603274 0 0 Z " fill="#1A78CA" transform="translate(80,137)"/>
                        <path d="M0 0 C2.475 0.495 2.475 0.495 5 1 C5 1.66 5 2.32 5 3 C5.99 3 6.98 3 8 3 C8 3.99 8 4.98 8 6 C8.66 6 9.32 6 10 6 C9.67 6.66 9.34 7.32 9 8 C7.49712782 6.85793642 5.99776716 5.71125043 4.5 4.5625 C3.6646875 3.92441406 2.829375 3.28632813 1.96875 2.62890625 C1.3190625 2.09136719 0.669375 1.55382812 0 1 C0 0.67 0 0.34 0 0 Z " fill="#DCE9F2" transform="translate(171,27)"/>
                        <path d="M0 0 C-2.85306797 2.32472205 -5.54074837 3.7508258 -9 5 C-8.75 3.125 -8.75 3.125 -8 1 C-5.08518252 -1.1107299 -3.34823603 -1.19579858 0 0 Z " fill="#EEF4F5" transform="translate(68,19)"/>
                        <path d="M0 0 C0.33 0 0.66 0 1 0 C1.33 1.98 1.66 3.96 2 6 C2.66 6 3.32 6 4 6 C4.33 7.65 4.66 9.3 5 11 C4.34 11 3.68 11 3 11 C2.67 11.66 2.34 12.32 2 13 C0.24252386 8.49646738 -0.19294408 4.82360189 0 0 Z " fill="#1879C8" transform="translate(81,110)"/>
                        <path d="M0 0 C1.65 0 3.3 0 5 0 C5 0.99 5 1.98 5 3 C2.5 5.1875 2.5 5.1875 0 7 C0 4.69 0 2.38 0 0 Z " fill="#EBF1F3" transform="translate(40,32)"/>
                        <path d="M0 0 C2.3125 0.1875 2.3125 0.1875 4 1 C2.47058649 4.05882701 0.05780454 4.68951234 -3 6 C-3.66 5.67 -4.32 5.34 -5 5 C-2.75 2.4375 -2.75 2.4375 0 0 Z " fill="#CDCCCC" transform="translate(163,202)"/>
                        <path d="M0 0 C0.99 0.33 1.98 0.66 3 1 C1.75023244 4.65316671 1.32901247 5.78065836 -2 8 C-1.125 1.125 -1.125 1.125 0 0 Z " fill="#1981E1" transform="translate(195,168)"/>
                        <path d="M0 0 C4.67692308 1.47692308 4.67692308 1.47692308 6.3125 4.125 C6.539375 4.74375 6.76625 5.3625 7 6 C6.01 5.67 5.02 5.34 4 5 C2.63106761 4.94729537 2.63106761 4.94729537 0 6 C0 4.02 0 2.04 0 0 Z " fill="#1379D9" transform="translate(88,145)"/>
                        <path d="M0 0 C3.96 0 7.92 0 12 0 C12 0.66 12 1.32 12 2 C6.140625 3.07421875 6.140625 3.07421875 4 3 C2.68 2.01 1.36 1.02 0 0 Z " fill="#2D97F6" transform="translate(84,13)"/>
                        <path d="M0 0 C1.32 0.33 2.64 0.66 4 1 C3.34 1 2.68 1 2 1 C2 1.99 2 2.98 2 4 C3.32 4.33 4.64 4.66 6 5 C0.25 5.125 0.25 5.125 -2 4 C-1.34 2.68 -0.68 1.36 0 0 Z " fill="#FCF8F1" transform="translate(142,8)"/>
                        <path d="M0 0 C3.16115776 1.36983503 3.9927092 1.9890638 6 5 C0.25 4.25 0.25 4.25 -2 2 C-1.34 2 -0.68 2 0 2 C0 1.34 0 0.68 0 0 Z " fill="#1780DE" transform="translate(70,203)"/>
                        <path d="M0 0 C1.65 0 3.3 0 5 0 C5.66 1.32 6.32 2.64 7 4 C4.69 3.67 2.38 3.34 0 3 C0 2.01 0 1.02 0 0 Z " fill="#1884EA" transform="translate(104,172)"/>
                        <path d="M0 0 C1.1875 1.625 1.1875 1.625 2 4 C0.625 7.25 0.625 7.25 -1 10 C-1.66 9.01 -2.32 8.02 -3 7 C-2.690625 6.401875 -2.38125 5.80375 -2.0625 5.1875 C-0.89790296 2.91043228 -0.89790296 2.91043228 0 0 Z " fill="#1C82D9" transform="translate(203,155)"/>
                        <path d="M0 0 C0.66 0.33 1.32 0.66 2 1 C1.74438677 3.3431213 1.40729228 5.67843403 1 8 C0.01 8.495 0.01 8.495 -1 9 C-1.625 6.1875 -1.625 6.1875 -2 3 C-1.34 2.01 -0.68 1.02 0 0 Z " fill="#2095FC" transform="translate(14,85)"/>
                        <path d="M0 0 C3.79303725 1.00193437 6.71536341 1.81024227 10 4 C6.05272412 4.17942163 3.4019487 4.09350689 0 2 C0 1.34 0 0.68 0 0 Z " fill="#B7C0C9" transform="translate(70,207)"/>
                        <path d="M0 0 C1.98 0.66 3.96 1.32 6 2 C5.67 2.99 5.34 3.98 5 5 C3.35 4.67 1.7 4.34 0 4 C0 2.68 0 1.36 0 0 Z " fill="#0E87EF" transform="translate(152,200)"/>
                        <path d="M0 0 C0.33 0 0.66 0 1 0 C1.28571429 7.42857143 1.28571429 7.42857143 -1 11 C-2.23076923 4.6 -2.23076923 4.6 -1.0625 1.5625 C-0.711875 1.046875 -0.36125 0.53125 0 0 Z " fill="#0B89F6" transform="translate(213,125)"/>
                        <path d="M0 0 C0.99 0.33 1.98 0.66 3 1 C1.35 2.65 -0.3 4.3 -2 6 C-2.33 5.01 -2.66 4.02 -3 3 C-2.01 2.01 -1.02 1.02 0 0 Z " fill="#E9EDF1" transform="translate(35,40)"/>
                        <path d="M0 0 C0.99 0.33 1.98 0.66 3 1 C3 1.99 3 2.98 3 4 C1.35 4.66 -0.3 5.32 -2 6 C-1.34 4.02 -0.68 2.04 0 0 Z " fill="#E2E0DE" transform="translate(186,186)"/>
                        <path d="M0 0 C0.99 0 1.98 0 3 0 C3.66 1.65 4.32 3.3 5 5 C4.01 5.33 3.02 5.66 2 6 C1.34 4.02 0.68 2.04 0 0 Z " fill="#1A7FDA" transform="translate(129,64)"/>
                        <path d="M0 0 C0 0.99 0 1.98 0 3 C-0.66 3 -1.32 3 -2 3 C-2 3.66 -2 4.32 -2 5 C-3.65 5 -5.3 5 -7 5 C-2.25 0 -2.25 0 0 0 Z " fill="#3FA1F6" transform="translate(60,24)"/>
                        <path d="M0 0 C1 3 1 3 1 5 C-1.64 4.34 -4.28 3.68 -7 3 C-7 2.67 -7 2.34 -7 2 C-4.69 1.34 -2.38 0.68 0 0 Z " fill="#E1F0FB" transform="translate(151,12)"/>
                        <path d="M0 0 C3.3 0.99 6.6 1.98 10 3 C9.67 3.66 9.34 4.32 9 5 C6.03 4.01 3.06 3.02 0 2 C0 1.34 0 0.68 0 0 Z " fill="#DBDBDA" transform="translate(64,207)"/>
                        <path d="M0 0 C1.65 0 3.3 0 5 0 C3.35 1.65 1.7 3.3 0 5 C-0.66 4.01 -1.32 3.02 -2 2 C-1.34 2 -0.68 2 0 2 C0 1.34 0 0.68 0 0 Z " fill="#177CD6" transform="translate(187,178)"/>
                        <path d="M0 0 C1.32 0.33 2.64 0.66 4 1 C4.33 2.65 4.66 4.3 5 6 C3 6 3 6 1.375 4.6875 C0 3 0 3 0 0 Z " fill="#1290FA" transform="translate(24,162)"/>
                        <path d="M0 0 C0.66 0 1.32 0 2 0 C2.33 2.31 2.66 4.62 3 7 C2.01 7.495 2.01 7.495 1 8 C-0.35439668 5.29120665 -0.06501451 2.99066732 0 0 Z " fill="#FCF6EF" transform="translate(9,144)"/>
                        <path d="M0 0 C0 0.66 0 1.32 0 2 C0.66 2.33 1.32 2.66 2 3 C0.02 3.99 0.02 3.99 -2 5 C-2.99 3.68 -3.98 2.36 -5 1 C-2 0 -2 0 0 0 Z " fill="#ECF3F6" transform="translate(104,120)"/>
                        </svg>`;
                micButton.title = 'Record voice';
                micButton.classList.remove('recording');
            }
        });

        // Handle speech recognition results
        recognition.onresult = (event) => {
            let interimTranscript = '';
            let newFinalTranscript = '';

            // Loop through results to separate interim and final transcripts
            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    newFinalTranscript += transcript + ' ';
                } else {
                    interimTranscript += transcript;
                }
            }

            // Append new final transcript to the existing one
            finalTranscript += newFinalTranscript;

            // Update textarea with the accumulated final transcript and interim transcript
            textarea.value = finalTranscript + interimTranscript;
            textarea.scrollTop = textarea.scrollHeight; // Auto-scroll to the bottom
            autoResizeTextarea(textarea); // Resize textarea after updating content
        };

        // Handle speech recognition errors
        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            micButton.classList.remove('recording');
            isRecording = false;
            textarea.value += `\n[Error: ${event.error}]`;
            autoResizeTextarea(textarea); // Resize after error message
            if (mediaRecorder && mediaRecorder.state === 'recording') {
                mediaRecorder.stop();
            }
        };

        // Restart recognition on end to extend pause duration
        recognition.onend = () => {
            // console.log('Speech recognition ended');
            if (isRecording) {
                // console.log('Restarting speech recognition to continue listening...');
                try {
                    recognition.start();
                } catch (error) {
                    console.error('Error restarting speech recognition:', error);
                    isRecording = false;
                    micButton.classList.remove('recording');
                }
            } else {
                // Reset state when recognition is fully stopped
                micButton.classList.remove('recording');
                isRecording = false;
            }
        };

        // Log when speech starts and ends for debugging
        recognition.onspeechstart = () => {
            // console.log('Speech detected.');
        };

        recognition.onspeechend = () => {
            // console.log('Speech paused (short pause detected).');
        };
    } else {
        // Fallback for unsupported browsers
        const micButton = document.querySelector('.n8n-chat-widget .mic-button');
        micButton.disabled = true;
        micButton.title = 'Speech recognition not supported in this browser';
        console.warn('Speech recognition is not supported in this browser.');
    }


    function refreshChat() {
        messagesContainer.innerHTML = '';
        textarea.value = '';
        filePreviewContainer.innerHTML = '';
        currentFiles = [];
        abortController.abort(); // Abort any pending requests
        abortController = new AbortController(); // Create a new AbortController
        currentSessionId = generateUUID(); // Generate a new session ID
        startNewConversation();
        updateButtonVisibility();
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////



    // Ensure this is called when the chat widget opens
    toggleButton.addEventListener('click', () => {
        chatContainer.classList.toggle('open');
        
        if (chatContainer.classList.contains('open') && !currentSessionId) {
            currentSessionId = generateUUID(); // Generate a new session ID
            startNewConversation(); // Call the function to display the welcome message
        }
    });

    // Also call startNewConversation on initial load if the widget is open by default
    document.addEventListener('DOMContentLoaded', () => {
        const chatContainer = document.querySelector('.n8n-chat-widget .chat-container');
        chatContainer.classList.add('open'); // Open by default as per your request
        if (!currentSessionId) {
            currentSessionId = generateUUID(); // Generate a new session ID
            startNewConversation(); // Display welcome message on load
        }
    });



    



    ///////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////






    function showConfirmationDialog() {
        const backdrop = document.createElement('div');
        chatContainer.appendChild(backdrop);

        const dialog = document.createElement('div');
        dialog.className = 'confirmation-dialog';
        dialog.innerHTML = `
            <button class="dialog-close-button">×</button>
            <h3>Restart Conversation</h3>
            <p>Are you sure you want to restart a new conversation?</p>
            <div class="dialog-buttons">
                <button class="cancel-button">Cancel</button>
                <button class="restart-button">Restart</button>
            </div>
        `;
        chatContainer.appendChild(dialog);

        const closeDialog = () => {  
            dialog.remove();
            backdrop.remove();
        };

        dialog.querySelector('.cancel-button').addEventListener('click', closeDialog);
        dialog.querySelector('.dialog-close-button').addEventListener('click', closeDialog);

        dialog.querySelector('.restart-button').addEventListener('click', () => {
            speechSynthesis.cancel();
            closeDialog();
            refreshChat();
        });
    }

    function renderFilePreviews() {
        const filePreviewContainer = document.querySelector('.n8n-chat-widget .chat-input');
        const existingPreviews = filePreviewContainer.querySelectorAll('.file-preview');
        existingPreviews.forEach(preview => preview.remove());

        if (!currentFiles || currentFiles.length === 0) return;

        currentFiles.forEach((file, index) => {
            const filePreview = document.createElement('div');
            filePreview.className = `file-preview ${file.type.startsWith('audio/') ? 'audio' : ''}`;

            const fileUrl = URL.createObjectURL(file);
            filePreview.innerHTML = `
                <span class="file-preview-name">${file.name}</span>
                ${file.type.startsWith('audio/') ? `<audio src="${fileUrl}" controls></audio>` : ''}
                <button class="file-preview-remove" data-index="${index}">✕</button>
            `;

            filePreviewContainer.insertBefore(filePreview, filePreviewContainer.querySelector('.input-row'));

            const removeButton = filePreview.querySelector('.file-preview-remove');
            removeButton.addEventListener('click', () => {
                currentFiles.splice(index, 1);
                renderFilePreviews();
                updateButtonVisibility();
            });
        });
    }

    fileUploadButton.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', (e) => {
        const files = Array.from(e.target.files);
        // console.log('Files selected via file input:', files);
        currentFiles = [...currentFiles, ...files];
        renderFilePreviews();
        updateButtonVisibility();
    });




    sendButton.addEventListener('click', () => {
        const messageText = textarea.value.trim();
        const filesToSend = currentFiles || [];

        // Send the message with both text and files (if any)
        if (messageText || filesToSend.length > 0) {
            sendMessage(messageText, filesToSend);

            // Clear the textarea and file preview after sending
            textarea.value = '';
            autoResizeTextarea(textarea);
            currentFiles = [];
            renderFilePreviews();
            updateButtonVisibility();
        }
    });



    textarea.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            const message = textarea.value.trim();
            if (message || currentFiles.length > 0) {
                sendMessage(message, currentFiles);
                textarea.value = '';
                autoResizeTextarea(textarea); // Add this line to reset the size
                currentFiles = [];
                updateButtonVisibility();
                renderFilePreviews();
            }
        }
    });


    
    textarea.addEventListener('input', function() {
        autoResizeTextarea(this);
        updateButtonVisibility();
    });
    
    
    

    toggleButton.addEventListener('click', () => {
        chatContainer.classList.toggle('open');
        
        if (chatContainer.classList.contains('open') && !currentSessionId) {
            startNewConversation();
        }
    });

    const closeButton = chatContainer.querySelector('.close-button');
    closeButton.addEventListener('click', () => {
        chatContainer.classList.remove('open');
    });


    refreshButton.addEventListener('click', () => {
            speechSynthesis.cancel(); // Stop any ongoing text-to-speech
            showConfirmationDialog();
    });

    let isResizing = false;
    let startX, startY, startWidth, startHeight, startLeft, startTop;

    resizeHandle.addEventListener('mousedown', function(e) {
        e.preventDefault();
        isResizing = true;
        startX = e.clientX;
        startY = e.clientY;
        const rect = chatContainer.getBoundingClientRect();
        startWidth = rect.width;
        startHeight = rect.height;
        startLeft = rect.left;
        startTop = rect.top;
        document.body.style.userSelect = 'none';
    });

    document.addEventListener('mousemove', function(e) {
        if (!isResizing) return;
        const dx = startX - e.clientX;
        const dy = startY - e.clientY;
        let newWidth = Math.max(300, startWidth + dx);
        let newHeight = Math.max(350, startHeight + dy);
        let newLeft = startLeft - dx;
        let newTop = startTop - dy;

        // Prevent moving out of viewport
        newLeft = Math.max(0, newLeft);
        newTop = Math.max(0, newTop);

        chatContainer.style.width = newWidth + 'px';
        chatContainer.style.height = newHeight + 'px';
        chatContainer.style.left = newLeft + 'px';
        chatContainer.style.top = newTop + 'px';
        chatContainer.style.right = 'auto';
        chatContainer.style.bottom = 'auto';
        chatContainer.style.position = 'fixed';
    });

    document.addEventListener('mouseup', function() {
        if (isResizing) {
            isResizing = false;
            document.body.style.userSelect = '';
        }
    });

    
    })();
