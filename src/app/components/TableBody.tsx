export default async function TableBody({
  page,
  pageSize,
}: {
  page: number;
  pageSize: number;
}) {
  const data = await getData(page, pageSize);
  return (
    <tbody>
      {data.map((v, index) => (
        <tr key={index}>
          <td className="py-2 px-4">{v.firstName}</td>
          <td className="py-2 px-4">{v.lastName}</td>
          <td className="py-2 px-4">{v.email}</td>
        </tr>
      ))}
    </tbody>
  );
}

TableBody.url = import.meta.url;

async function getData(page: number, pageSize: number) {
  await new Promise((r) => setTimeout(r, 1000));
  return data.slice(page * pageSize, (page + 1) * pageSize);
}

const data = [
  { firstName: "John", lastName: "Doe", email: "jdoe@email.com" },
  { firstName: "Jane", lastName: "Doe", email: "jane.doe@email.com" },
  { firstName: "David", lastName: "Smith", email: "d.smith@email.com" },
  { firstName: "Emily", lastName: "Jones", email: "e.jones@email.com" },
  { firstName: "William", lastName: "Johnson", email: "w.johnson@email.com" },
  { firstName: "Alex", lastName: "Brown", email: "a.brown@email.com" },
  { firstName: "Sophia", lastName: "Davis", email: "s.davis@email.com" },
  { firstName: "Michael", lastName: "Garcia", email: "m.garcia@email.com" },
  { firstName: "Emma", lastName: "Wilson", email: "e.wilson@email.com" },
  { firstName: "Daniel", lastName: "Anderson", email: "d.anderson@email.com" },
  { firstName: "Olivia", lastName: "Clark", email: "o.clark@email.com" },
  { firstName: "James", lastName: "Lee", email: "j.lee@email.com" },
  { firstName: "Ava", lastName: "Lopez", email: "a.lopez@email.com" },
  { firstName: "Benjamin", lastName: "Harris", email: "b.harris@email.com" },
  { firstName: "Isabella", lastName: "Green", email: "i.green@email.com" },
  { firstName: "Ethan", lastName: "King", email: "e.king@email.com" },
  { firstName: "Mia", lastName: "Perez", email: "m.perez@email.com" },
  { firstName: "Jacob", lastName: "Rivera", email: "j.rivera@email.com" },
  { firstName: "Abigail", lastName: "Gonzalez", email: "a.gonzalez@email.com" },
  { firstName: "Noah", lastName: "Smith", email: "n.smith@email.com" },
  { firstName: "Chloe", lastName: "Adams", email: "c.adams@email.com" },
  { firstName: "Liam", lastName: "Campbell", email: "l.campbell@email.com" },
  { firstName: "Evelyn", lastName: "Mitchell", email: "e.mitchell@email.com" },
  { firstName: "Lucas", lastName: "Robinson", email: "l.robinson@email.com" },
  { firstName: "Harper", lastName: "Nelson", email: "h.nelson@email.com" },
  { firstName: "Logan", lastName: "Parker", email: "l.parker@email.com" },
  { firstName: "Madison", lastName: "Turner", email: "m.turner@email.com" },
  { firstName: "Caleb", lastName: "Collins", email: "c.collins@email.com" },
  { firstName: "Lily", lastName: "Stewart", email: "l.stewart@email.com" },
  { firstName: "Ryan", lastName: "Murphy", email: "r.murphy@email.com" },
  { firstName: "Grace", lastName: "Gomez", email: "g.gomez@email.com" },
  { firstName: "Mason", lastName: "Phillips", email: "m.phillips@email.com" },
  { firstName: "Sofia", lastName: "Baker", email: "s.baker@email.com" },
  { firstName: "Jackson", lastName: "Sullivan", email: "j.sullivan@email.com" },
  { firstName: "Avery", lastName: "Walker", email: "a.walker@email.com" },
  { firstName: "Aria", lastName: "Mitchell", email: "a.mitchell@email.com" },
  { firstName: "Gabriel", lastName: "Thompson", email: "g.thompson@email.com" },
  { firstName: "Leah", lastName: "White", email: "l.white@email.com" },
  { firstName: "Isaac", lastName: "Davis", email: "i.davis@email.com" },
  { firstName: "Natalie", lastName: "Martin", email: "n.martin@email.com" },
  { firstName: "Luke", lastName: "Wright", email: "l.wright@email.com" },
  { firstName: "Aaliyah", lastName: "Scott", email: "a.scott@email.com" },
  { firstName: "Connor", lastName: "Brown", email: "c.brown@email.com" },
  { firstName: "Hailey", lastName: "Adams", email: "h.adams@email.com" },
  { firstName: "Elijah", lastName: "Clark", email: "e.clark@email.com" },
  { firstName: "Victoria", lastName: "Thomas", email: "v.thomas@email.com" },
  { firstName: "Nicholas", lastName: "Hill", email: "n.hill@email.com" },
  { firstName: "Zoe", lastName: "Baker", email: "z.baker@email.com" },
  { firstName: "Gavin", lastName: "Gonzales", email: "g.gonzales@email.com" },
];
