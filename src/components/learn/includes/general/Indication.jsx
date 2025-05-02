import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import styled, { keyframes } from "styled-components";
import { db } from "../../../../firebase";
import { useRef } from "react";

function Indication() {
    const [data, setData] = useState("");
    const {
        user_data: { uid, roomId },
    } = useSelector((state) => state);

    const snapshot = useRef(null);
    useEffect(() => {
        if ((uid, roomId)) {
            let unsub = onSnapshot(doc(db, "lastMessage", roomId), (doc) => {
                setData(doc.data());
                // const interval = setTimeout(() => {
                document.title =
                    data?.fromId !== uid && data?.unread
                        ? `(New Message) Steyp | An EdTech company for students to become skilled engineers &future scientists, an initiative from Talrop.`
                        : "Steyp | An EdTech company for students to become skilled engineers &future scientists, an initiative from Talrop.";
                // }, 1000);
            });

            snapshot.current = () => unsub();
        }
    }, [uid, roomId, data]);

    return (
        <>
            {data?.fromId !== uid && data?.unread && (
                <BlinkingImage></BlinkingImage>
            )}
        </>
    );
}
function blinkingEffect() {
    return keyframes`
      50% {
        opacity: 0;
      }
    `;
}
const BlinkingImage = styled.div`
    position: absolute;
    top: -9px;
    left: 6px;
    width: 7px;
    height: 7px;
    background: #4caf50;
    border-radius: 50%;
    margin: 0 auto;
    margin-bottom: 3px;
    animation: ${blinkingEffect} 1s linear infinite;
`;
export default Indication;
