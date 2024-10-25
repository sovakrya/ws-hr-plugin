export type Speciality = {
  id: number;
  name: string;
  activity: boolean;
  documentId: string;
  tasks: Task[];
};

type Task = {
  id: number;
  documentId: string;
  activity: boolean;
  name: string;
  taskText: string;
};

type DataSpeciality = {
  data: Speciality[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};

export async function getSpecialities(): Promise<DataSpeciality> {
  const resp = await fetch('http://localhost:1337/api/specialities?populate=*', { method: 'GET' });

  return resp.json();
}

export async function addUUID(speciality: string) {
  const resp = await fetch('http://localhost:1337/api/task-links', {
    method: 'POST',
    body: JSON.stringify({
      speciality: speciality,
    }),
  });

  return resp.json();
}

export async function getUUID(documentId: string) {
  const resp = await fetch(`http://localhost:1337/api/task-links/${documentId}?populate=task`, {
    method: 'GET',
  });

  console.log(documentId)

  return resp.json();
}
