#include <stdio.h>

int main() {

    int RollNo;
    char Name[50];
    float Chemistry, Physics, Maths;
 
    printf("Enter student Details\n");

    printf("Enter Roll Number: ");
    scanf("%d", &RollNo);

    printf("Enter Name: ");
    scanf("%s", &Name);

    printf("Enter Chemistry Marks: ");
    scanf("%f", &Chemistry);

    printf("Enter Physics Marks: ");
    scanf("%f", &Physics);

    printf("Enter Maths Marks: ");
    scanf("%f", &Maths);

    printf("Roll Number: %d\n", RollNo);
    printf("Name: %c\n", Name);
    printf("Chemistry Marks: %.2f\n", Chemistry);
    printf("Physics Marks: %.2f\n", Physics);
    printf("Maths Marks: %.2f\n", Maths);

    float total_marks = Chemistry + Physics + Maths;
    float percentage = total_marks / 3;

    printf("\nTotal Marks: %.2f\n", total_marks);
    printf("Percentage: %.2f%%\n", percentage);

    return 0;
}
