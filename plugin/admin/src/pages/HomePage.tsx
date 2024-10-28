import {
  Main,
  Typography,
  SingleSelectOption,
  SingleSelect,
  Box,
  Button,
} from '@strapi/design-system';
import { useEffect, useState } from 'react';
import { Speciality as Specialty, addUUID, getSpecialities, getUUID } from '../api/plugin';
import styled from 'styled-components';
import { BaseLink } from '@strapi/design-system';

const host = 'http://localhost:1337';

const LinkContentBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const Linkbox = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const WarnningBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const WarnningTextBox = styled.div`
  display: flex;
  gap: 4px;
`;

const NoticeBox = styled.div`
  box-shadow: 0px 4px 25px 0px #00000026;
  border-radius: 4px;
  width: 178px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HomePage = () => {
  const [specialities, setSpecialities] = useState<Specialty[]>([]);
  const [selectValue, setSelectValue] = useState<string | null>(null);
  const [link, setLink] = useState('');
  const [isGenerated, setIsGenerated] = useState(false);
  const [isCopy, setIsCopy] = useState(false);

  function getSpecialitiesFromFetch() {
    const correctedSpecialities: Specialty[] = [];
    getSpecialities().then((res) => {
      for (let speciality of res.data) {
        for (let task of speciality.tasks) {
          if (speciality.activity && task.activity) {
            correctedSpecialities.push(speciality);
          }
        }
      }

      setSpecialities(correctedSpecialities);
    });
  }

  useEffect(() => {
    getSpecialitiesFromFetch();
  }, []);

  function createLink() {
    addUUID(selectValue!).then((res) => {
      getUUID(res.documentId).then((resp) => {
        setLink(`${host}/tasks/${resp.data.uuid}`);
      });
    });

    setIsGenerated(true);
  }

 async function copyLink(){
    await navigator.clipboard.writeText(link)
    setIsCopy(true)
  }

  return (
    <Main
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 25,
        paddingTop: 40,
        paddingBottom: 40,
        paddingLeft: 56,
        paddingRight: 56,
      }}
    >
      <Typography variant="beta" style={{ fontSize: 32, fontWeight: 400, color: '#32324D' }}>
        Выбор задания
      </Typography>

      {!specialities.length ? (
        <Typography style={{ fontWeight: 400, fontSize: 14, color: '#32324D' }}>
          Для выбора задания необходимо добавить хотя бы одну активную специальность и хотя бы одно
          активное задания для нее.
        </Typography>
      ) : (
        <>
          <Box style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <Typography>Специальность</Typography>
            <SingleSelect
              placeholder="Выберите специальность"
              style={{ width: 640, height: 43 }}
              value={selectValue}
              onChange={(val: string | null) => setSelectValue(val)}
            >
              {specialities.map((speciality) => {
                return (
                  <SingleSelectOption key={speciality.id} value={speciality.documentId}>
                    {speciality.name}
                  </SingleSelectOption>
                );
              })}
            </SingleSelect>
          </Box>

          <Button style={{ width: 270, height: 33 }} disabled={!selectValue} onClick={createLink}>
            Сгенерировать ссылку на задание
          </Button>

          {isGenerated ? (
            <LinkContentBox>
              <Linkbox>
                <Typography>Ссылка на страницу задания:</Typography>
                <BaseLink
                  href={link}
                  style={{ color: '#1677FF', fontSize: '1.4rem', lineHeight: 1.43 }}
                >
                  {link}
                </BaseLink>
                <button style={{ cursor: 'pointer' }} onClick={copyLink}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.5188 0H7.46354C6.67562 0 6.03467 0.641 6.03467 1.42887V4.78252H7.33902V1.42887C7.33902 1.36022 7.39489 1.30435 7.46354 1.30435H18.5188C18.5875 1.30435 18.6434 1.36022 18.6434 1.42887V12.4842C18.6434 12.5529 18.5875 12.6087 18.5188 12.6087H15.2698V13.9131H18.5188C19.3067 13.9131 19.9477 13.2721 19.9477 12.4842V1.42887C19.9477 0.641 19.3067 0 18.5188 0Z"
                      fill="#666687"
                    />
                    <path
                      d="M12.5364 6.08691H1.48116C0.693246 6.08691 0.0522461 6.72791 0.0522461 7.51583V18.5711C0.0522896 19.359 0.693246 20 1.48116 20H12.5365C13.3244 20 13.9654 19.359 13.9654 18.5712V7.51583C13.9654 6.72791 13.3243 6.08691 12.5364 6.08691ZM12.5365 18.6957H1.48116C1.41246 18.6957 1.35659 18.6398 1.35659 18.5712V7.51583C1.35659 7.44713 1.41246 7.39126 1.48116 7.39126H12.5365C12.6052 7.39126 12.661 7.44713 12.661 7.51583V18.5712H12.6611C12.6611 18.6398 12.6052 18.6957 12.5365 18.6957Z"
                      fill="#666687"
                    />
                  </svg>
                </button>
                {isCopy ? (
                  <NoticeBox>
                    <Typography>Ссылка скопирована</Typography>
                  </NoticeBox>
                ) : (
                  <></>
                )}
              </Linkbox>

              <WarnningBox>
                <Typography>Скопируйте ссылку, чтобы отправить ее соискателю.</Typography>
                <WarnningTextBox>
                  <Typography style={{ color: '#f56725', fontWeight: 600 }}>Внимание!</Typography>
                  <Typography>
                    Ссылка является одноразовой, поэтому не переходите по ней, во избежание ее
                    инвалидации
                  </Typography>
                </WarnningTextBox>
              </WarnningBox>
            </LinkContentBox>
          ) : (
            <></>
          )}
        </>
      )}
    </Main>
  );
};

export { HomePage };
