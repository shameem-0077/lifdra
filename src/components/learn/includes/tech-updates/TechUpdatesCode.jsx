import React from "react";
import styled from "styled-components";
import remarkGfm from "remark-gfm";
import { discription } from "./table.json";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

function TechUpdatesCode() {
    const markdown = `function useOutsideAlerter(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    handleModal();
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);`;
    //   gderyery
    return (
        <>
            <MainContainer>
                <ContentBox>
                    <ReactMarkdown plugins={[remarkGfm]}>
                        {discription}
                    </ReactMarkdown>
                </ContentBox>
                <Highlight language="javascript" style={docco}>
                    {markdown}
                </Highlight>
            </MainContainer>
        </>
    );
}

export default TechUpdatesCode;

const Highlight = styled(SyntaxHighlighter)`
    width: 70%;
    margin-top: 30px;
`;
const ContentBox = styled.div`
    width: 100%;
    overflow-y: scroll;
    margin-top: 50px;

    h3 {
        margin-bottom: 20px;
        color: #474747;
        font-size: 24px;
        font-weight: 500;
    }

    p {
        margin-bottom: 10px;
        width: 901px;
        flex-direction: column;
        color: #474747;
        font-size: 20px;

        em {
            font-style: italic;
            text-decoration: underline;
            color: #15bf81;
        }
    }
`;
