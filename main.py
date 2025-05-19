import pygame
import random


pygame.init()
size = 100
test = []
WIDTH, HEIGHT = 600, 400
for j in range(size - 1):
    test.append(random.randint(20, HEIGHT - 5))


def bubble_sort(items, screen):
    for i in range(len(items)):
        #outer loop selects first element, 
        #inner loop runs through every other element and checks if the value is greater than and swaps
        for j in range(0, len(items) - i - 1):
            draw_list(items, screen, highlight_indicies=[j, j+1])
            pygame.time.wait(5)
            if items[j] > items[j + 1]:
                items[j], items[j + 1] = items[j + 1], items[j]
            draw_list(items, screen)

def draw_list(items, screen, highlight_indicies=[]):
    screen.fill((0, 0, 0))
    bar_width = WIDTH // len(items)

    for i in range(len(items)):
        x = i * bar_width
        y = items[i]
        color = (0, 255, 0) if i in highlight_indicies else (255, 0, 0)
        pygame.draw.rect(screen, color, (x, HEIGHT - y, bar_width - 5, y))
    pygame.display.update()

if __name__ == "__main__":
    screen = pygame.display.set_mode((WIDTH, HEIGHT))
    draw_list(test, screen)
    pygame.display.update()

    waiting = True
    while waiting:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                waiting = False
                pygame.quit()
                exit()
            elif event.type == pygame.KEYDOWN:
                waiting = False
    pygame.display.set_caption("Bubble Sort Visualizer")

    bubble_sort(test, screen)

    running = True
    while running:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False