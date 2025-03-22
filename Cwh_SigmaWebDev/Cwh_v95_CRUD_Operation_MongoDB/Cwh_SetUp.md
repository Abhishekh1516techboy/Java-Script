# `---DataBase MongoDB---`

# Full Form Of CRUD

```
C - create
R - Read
U - Update
D - Delete
```

# `CREATE Funcitionality`

### `Step-1`

### Show All DataBase.

```
show dbs;
```

### `Step-2`

### Create New DataBase And Use.

```
use employees;
```

### `Step-3`

### Create New Collection and insert only One documents.

```
db.workers.insertOne({name:"ravi", age:28});
```

### `Step-4`

### Create New Collection and insert Multiple documents.

```
db.workers.insertMany(
    [
        { name: "kunkun", age: 28 },
        { name: "sumit", age: 24 },
        { name: "saurabh", age: 41 },
        { name: "ankur", age: 24 },
        { name: "vinod", age: 21 }
    ]
);
```

# `READ Funcitionality`

### `Step-1`

### Read All documents of Collection.

```
db.workers.find();
```

### `Step-2`

### Read only One documents of Collection.

```
db.workers.findOne();
```

### `Step-3`

### Read All Filter documents of Collection.

```
db.workers.find({age: 24});
```

### `Step-4`

### Read Only One Filter documents of Collection.

```
db.workers.findOne({age: 24});
```

### `Step-5`

### Read All (age < 30) Filter documents of Collection.

```
db.workers.find({age: {$lt: 30}});
```

### `Step-6`

### Read Only One (age < 30) Filter documents of Collection.

```
db.workers.findOne({age: {$lt: 30}});
```

### `Step-7`

### Read All (age > 30) Filter documents of Collection.

```
db.workers.find({age: {$gt: 30}});
```

### `Step-8`

### Read Only One (age > 30) Filter documents of Collection.

```
db.workers.findOne({age: {$gt: 30}});
```

### `Step-9`

### Read All Specify (AND) Conditions Filter documents of Collection.

```
db.workers.find({jobRole:'tester', age: {$lt: 30}});
```

### `Step-10`

### Read Only One Specify (AND) Conditions Filter documents of Collection.

```
db.workers.findOne({jobRole:'tester', age: {$lt: 30}});
```

### `Step-11`

### Read All Specify (OR) Conditions Filter documents of Collection.

```
db.workers.find({$or:[{name:'vipul'}, {age: {$gt: 30}}]});
```

### `Step-12`

### Read Only One Specify (OR) Conditions Filter documents of Collection.

```
db.workers.findOne({$or:[{name:'sumit'}, {age: {$lt: 30}}]});
```

# `UPDATE Funcitionality`

### `Step-1`

### Update All documents of Collection.

```
db.courses.updateMany({ duration: '6 month' }, { $set: { price: '40000' } });
```

### `Step-2`

### Update Only One documents of Collection.

```
db.courses.updateOne({ courseName: 'mongoDB' }, { $set: { price: '9000' } });
```

# `DELETE Funcitionality`

### `Step-1`

### Delete All documents of Collection.

```
db.courses.deleteMany({ duration: '1 month' });
```

### `Step-2`

### Delete Only One documents of Collection.

```
db.courses.deleteOne({ duration: '1 month' });
```
