select posts.id, posts.title, users.username, users.profile_pic
from posts
join users on users.id = posts.author_id
where users.id = $1 and posts.title like concat('%', $2, '%')