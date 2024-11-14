import React, { useRef, useState } from "react";
import {
  TextField,
  Box,
  Typography,
  List,
  ListItem,
  Paper,
  Checkbox,
} from "@mui/material";

const App = () => {
  const [inputText, setInputText] = useState("");
  const [sentenceList, setSentenceList] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]); // 체크 상태 관리
  const textAreaRef = useRef(null);

  const handleInputChange = (event) => {
    const text = event.target.value;
    setInputText(text);
    updateSentenceListWithChecks(text);
  };

  const updateSentenceListWithChecks = (text) => {
    const newSentences = text
      .split(/(?<=[.?!])\s+/)
      .filter((sentence) => sentence.trim() !== "");

    // 기존 문장 리스트와 비교하여 체크 상태를 유지
    const updatedCheckedItems = newSentences.map((sentence) => {
      const index = sentenceList.indexOf(sentence);
      return index !== -1 ? checkedItems[index] : false; // 기존 상태 유지 또는 초기화
    });

    setSentenceList(newSentences);
    setCheckedItems(updatedCheckedItems);
  };

  const handleSentenceClick = (sentence) => {
    const textarea = textAreaRef.current;
    if (!textarea) return;

    const startIndex = inputText.indexOf(sentence);
    const endIndex = startIndex + sentence.length;

    if (startIndex !== -1) {
      textarea.focus();
      textarea.setSelectionRange(startIndex, endIndex);
    }
  };

  const handleCheckboxChange = (index) => {
    setCheckedItems((prev) =>
      prev.map((checked, i) => (i === index ? !checked : checked))
    );
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        gap: 4,
        p: 4,
        boxSizing: "border-box",
      }}
    >
      {/* 좌측 텍스트 입력 */}
      <Paper
        sx={{
          width: "50%",
          height: "100%",
          p: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          overflow: "hidden",
        }}
        elevation={3}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" gutterBottom>
            문단 입력
          </Typography>
          <Typography variant="body2" color="text.secondary">
            글자 수: {inputText.length}
          </Typography>
        </Box>
        <TextField
          inputRef={textAreaRef}
          fullWidth
          multiline
          placeholder="여기에 문단을 입력하세요..."
          value={inputText}
          onChange={handleInputChange}
          variant="outlined"
          sx={{
            flexGrow: 1,
            overflow: "auto",
          }}
        />
      </Paper>

      {/* 우측 문장 리스트 */}
      <Paper
        sx={{
          width: "50%",
          height: "100%",
          p: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          overflow: "hidden",
        }}
        elevation={3}
      >
        <Typography variant="h6" gutterBottom>
          문장 리스트
        </Typography>
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
          }}
        >
          <List>
            {sentenceList.length > 0 ? (
              sentenceList.map((sentence, index) => (
                <ListItem
                  key={index}
                  divider
                  button
                  onClick={() => handleSentenceClick(sentence)}
                  sx={{
                    cursor: "pointer",
                    backgroundColor: checkedItems[index]
                      ? "rgba(144, 238, 144, 0.5)" // 옅은 초록색
                      : "transparent",
                    transition: "background-color 0.3s",
                  }}
                >
                  <Checkbox
                    checked={checkedItems[index]}
                    onChange={() => handleCheckboxChange(index)}
                    onClick={(e) => e.stopPropagation()} // 체크박스 클릭 시 문장 선택 방지
                  />
                  {sentence}
                </ListItem>
              ))
            ) : (
              <Typography color="text.secondary">
                입력된 문장을 분리하여 여기에 표시됩니다.
              </Typography>
            )}
          </List>
        </Box>
      </Paper>
    </Box>
  );
};

export default App;
