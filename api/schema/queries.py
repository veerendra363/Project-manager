import graphene
from .types import OrganizationListType, OrganizationType, ProjectListType, ProjectType, TaskCommentListType, TaskListType, TaskType
from api.models import Organization, Project, Task, TaskComment

class Query(graphene.ObjectType):
    # Organizations
    organizations = graphene.Field(
        OrganizationListType,
        page=graphene.Int(),
        page_size=graphene.Int(),
        order_by=graphene.String(default_value="desc")  # new argument
    )
    organization = graphene.Field(OrganizationType, id=graphene.ID(required=True))

    # Projects
    projects = graphene.Field(
        ProjectListType,
        organization_id=graphene.ID(required=True),
        page=graphene.Int(),
        page_size=graphene.Int(),
        order_by=graphene.String(default_value="desc")
    )
    project = graphene.Field(ProjectType, id=graphene.ID(required=True))

    # Tasks
    tasks = graphene.Field(
        TaskListType,
        project_id=graphene.ID(required=True),
        page=graphene.Int(),
        page_size=graphene.Int(),
        order_by=graphene.String(default_value="desc")
    )
    task = graphene.Field(TaskType, id=graphene.ID(required=True))

    # Task Comments
    task_comments = graphene.Field(
        TaskCommentListType,
        task_id=graphene.ID(required=True),
        page=graphene.Int(),
        page_size=graphene.Int(),
        order_by=graphene.String(default_value="desc")
    )

    def resolve_organizations(self, info, page=1, page_size=10, order_by="desc"):
        ordering = "-id" if order_by.lower() == "desc" else "id"
        qs = Organization.objects.all().order_by(ordering)
        start = (page - 1) * page_size
        end = start + page_size
        return OrganizationListType(total_count=qs.count(), results=qs[start:end])
    
    def resolve_organization(self, info, id):
        try:
            return Organization.objects.get(id=id)
        except Organization.DoesNotExist:
            return None

    def resolve_projects(self, info, organization_id, page=1, page_size=10, order_by="desc"):
        ordering = "-id" if order_by.lower() == "desc" else "id"
        qs = Project.objects.filter(organization_id=organization_id).order_by(ordering)
        total = qs.count()
        start = (page - 1) * page_size
        end = start + page_size
        return ProjectListType(total_count=total, results=qs[start:end])
    
    def resolve_project(self, info, id):
        try:
            return Project.objects.get(id=id)
        except Project.DoesNotExist:
            return None


    def resolve_tasks(self, info, project_id, page=1, page_size=10, order_by="desc"):
        ordering = "-id" if order_by.lower() == "desc" else "id"
        qs = Task.objects.filter(project_id=project_id).order_by(ordering)
        total = qs.count()
        start = (page - 1) * page_size
        end = start + page_size
        return TaskListType(total_count=total, results=qs[start:end])
    
    def resolve_task(self, info, id):
        try:
            return Task.objects.get(id=id)
        except Task.DoesNotExist:
            return None

    def resolve_task_comments(self, info, task_id, page=1, page_size=10, order_by="desc"):
        ordering = "-id" if order_by.lower() == "desc" else "id"
        qs = TaskComment.objects.filter(task_id=task_id).order_by(ordering)
        total = qs.count()
        start = (page - 1) * page_size
        end = start + page_size
        return TaskCommentListType(total_count=total, results=qs[start:end])