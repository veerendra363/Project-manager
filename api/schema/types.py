import graphene
from graphene_django import DjangoObjectType
from api.models import Organization, Project, Task, TaskComment

# --- Object Types ---
class OrganizationType(DjangoObjectType):
    class Meta:
        model = Organization
        fields = "__all__"

class ProjectType(DjangoObjectType):
    task_count = graphene.Int()
    completed_tasks = graphene.Int()

    class Meta:
        model = Project
        fields = "__all__"

    def resolve_task_count(self, info):
        return self.tasks.count()

    def resolve_completed_tasks(self, info):
        return self.tasks.filter(status='DN').count()

class TaskType(DjangoObjectType):
    class Meta:
        model = Task
        fields = "__all__"

class TaskCommentType(DjangoObjectType):
    class Meta:
        model = TaskComment
        fields = "__all__"