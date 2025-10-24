import db from "#db/client";

/** @returns the employee created according to the provided details */
export async function createEmployee({ name, birthday, salary }) {
  const sql = `
  INSERT INTO employees
    (name, birthday, salary)
  VALUES
    ($1, $2, $3)
  RETURNING *
  `;
  const {
    rows: [employee],
  } = await db.query(sql, [name, birthday, salary]);
  return employee;
}

// === Part 2 ===

/** @returns all employees */
export async function getEmployees() {
  const sql = `
  SELECT *
  FROM employees
  `;
  const { rows: employees } = await db.query(sql);
  return employees;
}

export async function getEmployee(id) {
  const sql = `
  SELECT *
  FROM employees
  WHERE id = $1
  `;
  const {
    rows: [employee],
  } = await db.query(sql, [id]);
  return employee;
}

export async function updateEmployee({ id, name, birthday, salary }) {
  const sql = `
  UPDATE employees
  SET
    name = $2,
    birthday = $3,
    salary = $4
  WHERE id = $1
  RETURNING *
  `;
  const {
    rows: [employee],
  } = await db.query(sql, [id, name, birthday, salary]);
  return employee;
}

export async function deleteEmployee(id) {
  const sql = `
  DELETE FROM employees
  WHERE id = $1
  RETURNING *
  `;
  const {
    rows: [employee],
  } = await db.query(sql, [id]);
  return employee;
}
