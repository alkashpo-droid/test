# bot.py
from telegram import Update, InlineKeyboardMarkup, InlineKeyboardButton
from telegram.ext import Application, CommandHandler, ContextTypes

# Минимальный бот - только для запуска игры
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    # Создаем кнопку для запуска игры
    keyboard = [[InlineKeyboardButton("🎲 Играть в покер на костях", callback_data="play_game")]]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    await update.message.reply_text(
        "Добро пожаловать в покер на костях!",
        reply_markup=reply_markup
    )

async def launch_game(update: Update, context: ContextTypes.DEFAULT_TYPE):
    # Отправляем сообщение с игрой
    await update.callback_query.message.reply_game("poker_dice_game")

def main():
    application = Application.builder().token("ВАШ_ТОКЕН_OT_BOTFATHER").build()
    
    application.add_handler(CommandHandler("start", start))
    application.add_handler(CallbackQueryHandler(launch_game, pattern="play_game"))
    
    application.run_polling()

if __name__ == "__main__":
    main()