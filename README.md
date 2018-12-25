## Usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_name|string||
|email|string||
|password|string||

### Association
- has_many :members
- has_many :messages
- has_many :groups, through: :members



## Groupsテーブル

|Column|Type|Options|
|------|----|-------|
|group_name|string|null: false|

### Association
- has_many :members
- has_many :messages
- has_many :users, through: :members


## Messagesテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
|image|text||
|text|text|null: false|

### Association
- belongs_to :user
- belongs_to :group


## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user


