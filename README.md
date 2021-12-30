# API Endpoints

Mobile APP Server

## 遊戲

### 讀取所有遊戲資訊

```
GET https://Mobile-APP-Server.jacoblincool.repl.co/all
```

### 讀取指定遊戲資訊

```
GET https://Mobile-APP-Server.jacoblincool.repl.co/get?id={id}
```

## 排名

### 讀取所有遊戲排名

```
GET https://Mobile-APP-Server.jacoblincool.repl.co/ranking/all
```

### 讀取指定遊戲排名

```
GET https://Mobile-APP-Server.jacoblincool.repl.co/ranking/get?id={id}
```

### 新增遊戲排名

```
POST https://Mobile-APP-Server.jacoblincool.repl.co/ranking/add
```

Body (JSON):

```json
{
    "id": "game_id",
    "team": "team name",
    "name": "player name",
    "time": 12345678
}
```
