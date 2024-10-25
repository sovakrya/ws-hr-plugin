import {
  Main,
  Typography,
  SingleSelectOption,
  SingleSelect,
  Box,
  Button,
} from '@strapi/design-system';
import { useEffect, useState } from 'react';
import { Speciality as Specialty, getSpecialities } from '../api/plugin';

const HomePage = () => {
  const [specialities, setSpecialities] = useState<Specialty[]>([]);
  const [selectValue, setSelectValue] = useState<string | null>(null);

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

          <Button style={{ width: 270, height: 33 }} disabled={!selectValue}>
            Сгенерировать ссылку на задание
          </Button>
        </>
      )}
    </Main>
  );
};

export { HomePage };
