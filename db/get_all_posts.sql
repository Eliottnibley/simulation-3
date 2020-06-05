select posts.title, users.username, users.profile_pic
from posts
join users on users.id = posts.author_id