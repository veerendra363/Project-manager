import graphene
from .types import OrganizationType, ProjectType, TaskType, TaskCommentType
from api.models import Organization, Project, Task, TaskComment

class Query(graphene.ObjectType):
    organizations = graphene.List(OrganizationType)
    projects = graphene.List(ProjectType, organization_id=graphene.ID(required=True))
    tasks = graphene.List(TaskType, project_id=graphene.ID(required=True))
    task_comments = graphene.List(TaskCommentType, task_id=graphene.ID(required=True))

    def resolve_organizations(self, info):
        return Organization.objects.all()

    def resolve_projects(self, info, organization_id):
        return Project.objects.filter(organization_id=organization_id)

    def resolve_tasks(self, info, project_id):
        return Task.objects.filter(project_id=project_id)

    def resolve_task_comments(self, info, task_id):
        return TaskComment.objects.filter(task_id=task_id)
